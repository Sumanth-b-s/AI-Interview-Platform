const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const User = require("./models/User");
const Interview = require("./models/Interview");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  dest: "uploads/",
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Error:", error);
  });

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Signup Failed",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
      password,
    });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    res.json({
      success: true,

      message: "Login Success",

      token,

      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Login Failed",
    });
  }
});

app.post("/ai-chat", async (req, res) => {
  try {
    const { message } = req.body;

    const result = await model.generateContent(message);

    const response = result.response.text();

    res.json({
      reply: response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      reply: "Gemini AI failed",
    });
  }
});

app.post("/analyze-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        analysis: "No file uploaded",
      });
    }

    const dataBuffer = fs.readFileSync(req.file.path);

    const data = await pdfParse(dataBuffer);

    const prompt = `
Analyze this resume and give:

1. Skills
2. Strengths
3. Weaknesses
4. Improvement Suggestions
5. ATS Score out of 100

Resume Content:

${data.text}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    fs.unlinkSync(req.file.path);

    res.json({
      analysis: response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      analysis: "Resume analysis failed",
    });
  }
});

app.post("/generate-questions", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        questions: "No resume uploaded",
      });
    }

    const dataBuffer = fs.readFileSync(req.file.path);

    const data = await pdfParse(dataBuffer);

    const prompt = `
Generate 5 interview questions
based on this resume.

Resume:

${data.text}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    fs.unlinkSync(req.file.path);

    res.json({
      questions: response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      questions: "Question generation failed",
    });
  }
});

app.post("/evaluate-answer", async (req, res) => {
  try {
    const { answer } = req.body;

    const prompt = `
Evaluate this interview answer.

Give:

1. Confidence Score out of 100
2. Communication Skills
3. Technical Knowledge
4. Improvements

Answer:

${answer}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    const scoreMatch = response.match(/\b\d{1,3}\b/);

    const confidenceScore = scoreMatch ? Number(scoreMatch[0]) : 0;

    const newInterview = new Interview({
      answer,

      evaluation: response,

      confidenceScore,
    });

    await newInterview.save();

    res.json({
      evaluation: response,

      confidenceScore,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      evaluation: "Evaluation failed",

      confidenceScore: 0,
    });
  }
});

app.get("/interviews", async (req, res) => {
  try {
    const interviews = await Interview.find().sort({
      createdAt: -1,
    });

    res.json(interviews);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch interviews",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
