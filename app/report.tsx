import axios from "axios";

import React, { useEffect, useState } from "react";

import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

import { LineChart } from "react-native-chart-kit";

export default function ReportScreen() {
  const [interviews, setInterviews] = useState<any[]>([]);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await axios.get("http://10.98.57.188:5000/interviews");

      setInterviews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Interview Reports</Text>

      {/* ANALYTICS CHART */}

      <LineChart
        data={{
          labels:
            interviews.length > 0
              ? interviews.map((_, index) => `${index + 1}`)
              : ["0"],

          datasets: [
            {
              data:
                interviews.length > 0
                  ? interviews.map((item) => item.confidenceScore)
                  : [0],
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: "#1E293B",

          backgroundGradientFrom: "#1E293B",

          backgroundGradientTo: "#0F172A",

          decimalPlaces: 0,

          color: (opacity = 1) => `rgba(34,197,94,${opacity})`,

          labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,

          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginBottom: 30,
          borderRadius: 16,
        }}
      />

      {/* INTERVIEW CARDS */}

      {interviews.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.score}>Score: {item.confidenceScore}/100</Text>

          <Text style={styles.answer}>{item.answer}</Text>

          <Text style={styles.evaluation}>{item.evaluation}</Text>
        </View>
      ))}
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
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#1E293B",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },

  score: {
    color: "#22C55E",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  answer: {
    color: "white",
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },

  evaluation: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 24,
  },
});
