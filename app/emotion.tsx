import React, { useEffect, useRef, useState } from "react";

import { CameraView, useCameraPermissions } from "expo-camera";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EmotionScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const [emotion, setEmotion] = useState("Neutral 😐");

  const cameraRef = useRef(null);

  useEffect(() => {
    const emotions = ["Confident 😎", "Happy 😊", "Neutral 😐", "Nervous 😟"];

    const interval = setInterval(() => {
      const randomEmotion =
        emotions[Math.floor(Math.random() * emotions.length)];

      setEmotion(randomEmotion);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Camera permission needed</Text>

        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="front" />

      <View style={styles.overlay}>
        <Text style={styles.title}>AI Emotion Detection</Text>

        <Text style={styles.emotion}>{emotion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  camera: {
    flex: 1,
  },

  overlay: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    alignItems: "center",
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  emotion: {
    color: "#22C55E",
    fontSize: 32,
    fontWeight: "bold",
    backgroundColor: "#00000099",
    padding: 20,
    borderRadius: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F172A",
    padding: 20,
  },

  text: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
