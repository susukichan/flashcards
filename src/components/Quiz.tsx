import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../navigation";
import { useTypedSelector } from "../reducers/reducer";
import {
  clearLocalNotification,
  setLocalNotification
} from "../utility/Notification";
import { Btn } from "./Btn";
import { Card } from "./Card";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Quiz">;
  route: RouteProp<RootStackParamList, "Quiz">;
};

export const Quiz: FC<Props> = ({ navigation, route }) => {
  const { decks } = useTypedSelector(state => state);
  const deck_id = route.params.deck_id;
  const deck = decks[deck_id];

  const [index, setIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const onPress = answer => {
    const lastIndex = deck.questions.length;
    if (answer === deck.questions[index].answer.toString()) {
      setCorrectAnswers(x => x + 1);
    }
    setIndex(prevIndex => (prevIndex < lastIndex ? prevIndex + 1 : prevIndex));
  };

  const handleRestartQuiz = () => {
    setIndex(0);
    setCorrectAnswers(0);
  };

  const handleFinishQuiz = () => {
    clearLocalNotification().then(() => setLocalNotification);
    return navigation.navigate("Deck", {
      deck_id
    });
  };

  return (
    <View style={styles.quizContainer}>
      {deck.questions[index] ? (
        <View>
          <Card index={index} deck={deck} card={deck.questions[index]} />
          <View style={styles.btnContainer}>
            <Btn onPress={() => onPress("correct")}>
              <Text>Correct</Text>
            </Btn>
            <Btn onPress={() => onPress("incorrect")}>
              <Text>Incorrect</Text>
            </Btn>
          </View>
        </View>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.finalMessage}>You finished the quiz</Text>
          <Text style={styles.finalMessage}>
            You got{" "}
            {((correctAnswers / deck.questions.length) * 100).toFixed(2)}% of
            correct answers
          </Text>

          <Button title="Back to Deck" onPress={handleFinishQuiz} />
          <Button title="Restart quiz" onPress={handleRestartQuiz} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  quizContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnContainer: {},
  finalMessage: {
    fontSize: 22,
    textAlign: "center",
    margin: 20
  },
  messageContainer: {
    height: 200
  }
});
