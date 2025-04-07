import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Button from "@/components/buttons/Button";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileScreen() {
  const { logout } = useAuth();
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile screen</Text>
      <Button onPress={() => {
        logout()
      }} text={"test"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
