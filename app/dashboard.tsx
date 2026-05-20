import AsyncStorage from "@react-native-async-storage/async-storage";

import { useRouter } from "expo-router";

import React, { useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function DashboardScreen() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(true);

  const logout = async () => {
    await AsyncStorage.removeItem("token");

    await AsyncStorage.removeItem("user");

    router.replace("/login");
  };

  return (
    <LinearGradient
      colors={
        darkMode
          ? ["#0F172A", "#1E293B", "#0F172A"]
          : ["#E2E8F0", "#F8FAFC", "#E2E8F0"]
      }
      style={styles.container}
    >
      <ScrollView>
        <Text
          style={[
            styles.title,
            {
              color: darkMode ? "white" : "#0F172A",
            },
          ]}
        >
          AI Career Assistant
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: darkMode ? "#CBD5E1" : "#334155",
            },
          ]}
        >
          Smart AI Recruitment Platform
        </Text>

        {/* RESUME */}

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/resume")}
        >
          <Text style={styles.cardIcon}>📄</Text>

          <View>
            <Text
              style={[
                styles.cardTitle,
                {
                  color: darkMode ? "white" : "#0F172A",
                },
              ]}
            >
              Resume Analyzer
            </Text>

            <Text
              style={[
                styles.cardText,
                {
                  color: darkMode ? "#CBD5E1" : "#334155",
                },
              ]}
            >
              ATS score and resume analysis
            </Text>
          </View>
        </TouchableOpacity>

        {/* INTERVIEW */}

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/interview")}
        >
          <Text style={styles.cardIcon}>🎤</Text>

          <View>
            <Text
              style={[
                styles.cardTitle,
                {
                  color: darkMode ? "white" : "#0F172A",
                },
              ]}
            >
              AI Interview
            </Text>

            <Text
              style={[
                styles.cardText,
                {
                  color: darkMode ? "#CBD5E1" : "#334155",
                },
              ]}
            >
              Practice mock interviews
            </Text>
          </View>
        </TouchableOpacity>

        {/* REPORT */}

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/report")}
        >
          <Text style={styles.cardIcon}>📊</Text>

          <View>
            <Text
              style={[
                styles.cardTitle,
                {
                  color: darkMode ? "white" : "#0F172A",
                },
              ]}
            >
              Reports
            </Text>

            <Text
              style={[
                styles.cardText,
                {
                  color: darkMode ? "#CBD5E1" : "#334155",
                },
              ]}
            >
              View interview reports
            </Text>
          </View>
        </TouchableOpacity>

        {/* AI CHAT */}

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/ai-chat")}
        >
          <Text style={styles.cardIcon}>🤖</Text>

          <View>
            <Text
              style={[
                styles.cardTitle,
                {
                  color: darkMode ? "white" : "#0F172A",
                },
              ]}
            >
              AI Chat Assistant
            </Text>

            <Text
              style={[
                styles.cardText,
                {
                  color: darkMode ? "#CBD5E1" : "#334155",
                },
              ]}
            >
              Chat with Gemini AI
            </Text>
          </View>
        </TouchableOpacity>

        {/* EMOTION */}

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/emotion")}
        >
          <Text style={styles.cardIcon}>😊</Text>

          <View>
            <Text
              style={[
                styles.cardTitle,
                {
                  color: darkMode ? "white" : "#0F172A",
                },
              ]}
            >
              Emotion Detection
            </Text>

            <Text
              style={[
                styles.cardText,
                {
                  color: darkMode ? "#CBD5E1" : "#334155",
                },
              ]}
            >
              AI emotion analysis
            </Text>
          </View>
        </TouchableOpacity>

        {/* PROFILE */}

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.cardIcon}>👤</Text>

          <View>
            <Text
              style={[
                styles.cardTitle,
                {
                  color: darkMode ? "white" : "#0F172A",
                },
              ]}
            >
              Profile
            </Text>

            <Text
              style={[
                styles.cardText,
                {
                  color: darkMode ? "#CBD5E1" : "#334155",
                },
              ]}
            >
              View account details
            </Text>
          </View>
        </TouchableOpacity>

        {/* THEME BUTTON */}

        <TouchableOpacity
          style={styles.themeButton}
          onPress={() => setDarkMode(!darkMode)}
        >
          <Text style={styles.logoutText}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Text>
        </TouchableOpacity>

        {/* LOGOUT */}

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 60,
  },

  subtitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#ffffff15",
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  cardIcon: {
    fontSize: 35,
    marginRight: 20,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  cardText: {
    marginTop: 5,
    fontSize: 15,
  },

  themeButton: {
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },

  logoutButton: {
    backgroundColor: "#DC2626",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },

  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
