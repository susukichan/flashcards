import React, { useState, FC } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { colors } from "../utility/colors";

export const Card: FC<{ card; index: number; deck }> = ({
  card,
  index,
  deck
}) => {
  const [flipCard, setFlipcard] = useState(false);

  return (
    <View style={styles.card}>
      {!flipCard ? (
        <Text style={styles.content}>Question: {card.question}</Text>
      ) : (
        <Text style={styles.content}>
          Answer:{" "}
          {typeof card.answer === "boolean"
            ? card.answer.toString()
            : card.answer}
        </Text>
      )}
      <Text style={styles.text}>
        {index + 1} of {deck.questions.length}
      </Text>
      <Button onPress={() => setFlipcard(b => !b)} title="Flip card" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    minHeight: 250,
    minWidth: "80%",
    margin: 10,
    marginLeft: 40,
    marginRight: 40,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  content: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10
  }
});
