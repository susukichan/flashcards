import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useState } from "react";
import { Button, Picker, StyleSheet, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { addCardToDeckAction } from "../actions/actions";
import { RootStackParamList } from "../navigation";
import { addCardToDeck, Answer } from "../utility/api";
import { colors } from "../utility/colors";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "New Card">;
  route: RouteProp<RootStackParamList, "New Card">;
};

export const NewCard: FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const deck_id = route.params.deck_id;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<Answer | "">("correct");

  const onPress = () => {
    if (question === "" || answer === "") {
      return alert("Please, add question and answer");
    }

    const card = { deck_id, question, answer };

    dispatch(addCardToDeckAction(card));
    addCardToDeck(card);

    setQuestion("");
    setAnswer("");

    return navigation.navigate("Deck", { deck_id });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Type here your question"
        onChangeText={setQuestion}
        value={question}
        multiline={true}
      />

      <Button title="Create card" onPress={onPress} />

      <Picker
        selectedValue={answer}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => setAnswer(itemValue)}
      >
        <Picker.Item label="Correct" value="correct" />
        <Picker.Item label="Incorrect" value="incorrect" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    backgroundColor: colors.white,
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    padding: 10,
    marginBottom: 10
  }
});
