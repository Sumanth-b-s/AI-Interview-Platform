import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function InterviewResultScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Interview Report</Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreTitle}>Overall Score</Text>

        <Text style={styles.score}>87%</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Confidence Level</Text>

        <Text style={styles.cardText}>
          Excellent confidence and communication.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Eye Contact</Text>

        <Text style={styles.cardText}>
          Maintained good eye contact during interview.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Voice Analysis</Text>

        <Text style={styles.cardText}>
          Clear voice with moderate speaking speed.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI Suggestion</Text>

        <Text style={styles.cardText}>
          Try giving more structured answers with project examples.
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
