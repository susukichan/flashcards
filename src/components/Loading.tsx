import React, { FC } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import { colors } from "../utility/colors";

export const Loading: FC = () => {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingMessage}>Loading...</Text>
      <ActivityIndicator size="large" color={colors.gray} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingMessage: {
    textAlign: "center",
    fontSize: 22,
    color: colors.gray
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    height: 200
  }
});
