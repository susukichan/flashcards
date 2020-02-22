import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { saveDeckTitleAction } from "../actions/actions";
import { RootStackParamList } from "../navigation";
import { saveDeckTitle } from "../utility/api";
import { colors } from "../utility/colors";
import { generateUID } from "../utility/helpers";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "New Deck">;
};

export const NewDeck: FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [deckTitle, setDeckTitle] = useState("");

  const onPress = () => {
    if (deckTitle === "") {
      return alert("Please, add a title");
    }

    const deck_id = generateUID();
    const deck = {
      deck_id,
      title: deckTitle,
      questions: []
    };

    dispatch(saveDeckTitleAction(deck));
    saveDeckTitle(deck);
    setDeckTitle("");

    return navigation.navigate("Deck", { deck_id });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Type a deck title"
        onChangeText={setDeckTitle}
        value={deckTitle}
        multiline={true}
      />
      <Button title="Create deck" onPress={onPress} />
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
  },
  successMessage: {
    fontSize: 22,
    textAlign: "center"
  }
});
