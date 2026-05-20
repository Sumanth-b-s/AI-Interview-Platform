import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ResumeScreen() {
  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState("");

  const [atsScore, setAtsScore] = useState(0);

  const uploadResume = async () => {
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
        "http://10.98.57.188:5000/analyze-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setAnalysis(response.data.analysis);

      const scoreMatch = response.data.analysis.match(/\b\d{1,3}\b/);

      if (scoreMatch) {
        setAtsScore(Number(scoreMatch[0]));
      }
    } catch (error) {
      console.log(error);

      setAnalysis("Resume analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Resume Analyzer</Text>

      <TouchableOpacity style={styles.button} onPress={uploadResume}>
        <Text style={styles.buttonText}>Upload Resume PDF</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="blue"
          style={{ marginTop: 20 }}
        />
      ) : (
        <View>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreTitle}>ATS Score</Text>

            <Text style={styles.scoreValue}>{atsScore}/100</Text>
          </View>

          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{analysis}</Text>
          </View>
        </View>
      )}
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
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
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
    fontSize: 20,
    marginBottom: 10,
  },

  scoreValue: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },

  resultBox: {
    marginTop: 30,
    backgroundColor: "#1E293B",
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
  },

  resultText: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
  },
});
