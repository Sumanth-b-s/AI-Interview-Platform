import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import React, { useState } from "react";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function InterviewScreen() {
  const [questions, setQuestions] = useState("");
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // GENERATE INTERVIEW QUESTIONS
  // ==========================================
  const generateQuestions = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0];

      const formData = new FormData();

      formData.append(
        "resume",
        await fetch(file.uri).then((r) => r.blob()),
        file.name,
      );

      setLoading(true);

      const response = await axios.post(
        "http://10.98.57.188:5000/generate-questions",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);

      setQuestions("Question generation failed");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // EVALUATE ANSWER
  // ==========================================
  const evaluateAnswer = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://10.98.57.188:5000/evaluate-answer",
        {
          answer,
        },
      );

      if (response.data.evaluation) {
        setEvaluation(response.data.evaluation);

        const scoreMatch = response.data.evaluation.match(/\b\d{1,3}\b/);

        if (scoreMatch) {
          setConfidenceScore(Number(scoreMatch[0]));
        }
      } else {
        setEvaluation("No AI evaluation received");
      }
    } catch (error) {
      console.log(error);

      setEvaluation("Evaluation failed");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // GENERATE PDF REPORT
  // ==========================================
  const generatePDF = async () => {
    try {
      const html = `
        <html>
          <body style="font-family: Arial; padding: 20px;">
            <h1>AI Interview Report</h1>

            <h2>Confidence Score</h2>
            <p>${confidenceScore}/100</p>

            <h2>Interview Questions</h2>
            <p>${questions}</p>

            <h2>Your Answer</h2>
            <p>${answer}</p>

            <h2>AI Evaluation</h2>
            <p>${evaluation}</p>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({
        html,
      });

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Interview Generator</Text>

      {/* UPLOAD RESUME */}
      <TouchableOpacity style={styles.button} onPress={generateQuestions}>
        <Text style={styles.buttonText}>Upload Resume PDF</Text>
      </TouchableOpacity>

      {/* LOADING */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="white"
          style={{ marginTop: 20 }}
        />
      )}

      {/* QUESTIONS */}
      <View style={styles.resultBox}>
        <Text style={styles.heading}>Interview Questions</Text>

        <Text style={styles.resultText}>{questions}</Text>
      </View>

      {/* ANSWER BOX */}
      <View style={styles.answerBox}>
        <Text style={styles.heading}>Your Answer</Text>

        <TextInput
          placeholder="Type your answer..."
          placeholderTextColor="#94A3B8"
          multiline
          value={answer}
          onChangeText={setAnswer}
          style={styles.input}
        />
      </View>

      {/* EVALUATE BUTTON */}
      <TouchableOpacity style={styles.evaluateButton} onPress={evaluateAnswer}>
        <Text style={styles.buttonText}>Evaluate Answer</Text>
      </TouchableOpacity>

      {/* CONFIDENCE SCORE */}
      <View style={styles.scoreCard}>
        <Text style={styles.scoreTitle}>Confidence Score</Text>

        <Text style={styles.scoreValue}>{confidenceScore}/100</Text>
      </View>

      {/* AI EVALUATION */}
      <View style={styles.resultBox}>
        <Text style={styles.heading}>AI Evaluation</Text>

        <Text style={styles.resultText}>{evaluation}</Text>
      </View>

      {/* PDF BUTTON */}
      <TouchableOpacity style={styles.pdfButton} onPress={generatePDF}>
        <Text style={styles.buttonText}>Download PDF Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginTop: 50,
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },

  evaluateButton: {
    backgroundColor: "#22C55E",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  pdfButton: {
    backgroundColor: "#9333EA",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 40,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  resultBox: {
    backgroundColor: "#1E293B",
    padding: 20,
    borderRadius: 12,
    marginTop: 25,
  },

  resultText: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },

  heading: {
    color: "#93C5FD",
    fontSize: 24,
    fontWeight: "bold",
  },

  answerBox: {
    marginTop: 25,
  },

  input: {
    backgroundColor: "#1E293B",
    color: "white",
    borderRadius: 12,
    padding: 20,
    height: 180,
    marginTop: 15,
    textAlignVertical: "top",
    fontSize: 16,
  },

  scoreCard: {
    backgroundColor: "#2563EB",
    padding: 25,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 25,
  },

  scoreTitle: {
    color: "white",
    fontSize: 24,
    marginBottom: 10,
  },

  scoreValue: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
  },
});
