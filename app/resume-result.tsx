import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ResumeResultScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resume Analysis Result</Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreTitle}>ATS Score</Text>

        <Text style={styles.score}>82%</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Skills Detected</Text>

        <Text style={styles.cardText}>
          React Native, Node.js, MongoDB, JavaScript
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Missing Skills</Text>

        <Text style={styles.cardText}>TypeScript, AWS, Docker</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI Suggestion</Text>

        <Text style={styles.cardText}>
          Add more project descriptions and measurable achievements to improve
          ATS performance.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },

  scoreCard: {
    backgroundColor: "#2563EB",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 25,
  },

  scoreTitle: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
  },

  score: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#1E293B",
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },

  cardTitle: {
    color: "#60A5FA",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  cardText: {
    color: "white",
    fontSize: 16,
    lineHeight: 26,
  },
});
