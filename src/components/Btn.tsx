import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../utility/colors";

export const Btn = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.btn}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.steelblue,
    padding: 10,
    marginBottom: 20,
    height: 40,
    width: "80%",
    alignSelf: "center"
  },
  text: {
    color: colors.white,
    textAlign: "center",
    fontSize: 18
  }
});
