import axios from "axios";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AIChatScreen() {
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([
    {
      sender: "AI",
      text: "Hello 👋 I am your AI Career Assistant.",
    },
  ]);

  const sendMessage = async () => {
    if (!message) return;

    const userMessage = {
      sender: "You",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/ai-chat", {
        message,
      });

      console.log(response.data);

      const aiMessage = {
        sender: "AI",
        text: response.data.reply,
      };

      setChat((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
    }

    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Career Assistant</Text>

      <ScrollView style={styles.chatContainer}>
        {chat.map((item, index) => (
          <View
            key={index}
            style={[
              styles.messageBox,
              item.sender === "You" ? styles.userMessage : styles.aiMessage,
            ]}
          >
            <Text style={styles.sender}>{item.sender}</Text>

            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ask AI something..."
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: 60,
    paddingHorizontal: 15,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  chatContainer: {
    flex: 1,
  },

  messageBox: {
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    maxWidth: "85%",
  },

  userMessage: {
    backgroundColor: "#2563EB",
    alignSelf: "flex-end",
  },

  aiMessage: {
    backgroundColor: "#1E293B",
    alignSelf: "flex-start",
  },

  sender: {
    color: "#CBD5E1",
    fontSize: 12,
    marginBottom: 5,
  },

  messageText: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
  },

  inputContainer: {
    flexDirection: "row",
    marginVertical: 15,
  },

  input: {
    flex: 1,
    backgroundColor: "#1E293B",
    borderRadius: 14,
    paddingHorizontal: 15,
    color: "white",
    fontSize: 16,
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 14,
  },

  sendText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
