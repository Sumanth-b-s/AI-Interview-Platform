import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const userData = await AsyncStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.avatar}>👤</Text>

        <Text style={styles.name}>{user?.name}</Text>

        <Text style={styles.email}>{user?.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#1E293B",
    width: "100%",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
  },

  avatar: {
    fontSize: 80,
    marginBottom: 20,
  },

  name: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  email: {
    color: "#CBD5E1",
    fontSize: 18,
  },
});
