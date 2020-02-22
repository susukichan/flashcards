import { FontAwesome } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch } from "react-redux";
import { deleteDeck } from "../actions/actions";
import { RootStackParamList } from "../navigation";
import { useTypedSelector } from "../reducers/reducer";
import { removeDeck } from "../utility/api";
import { colors } from "../utility/colors";
import { Card } from "./Card";
import { Loading } from "./Loading";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Deck">;
  route: RouteProp<RootStackParamList, "Deck">;
};

export const Deck: FC<Props> = ({ navigation, route }) => {
  const { decks } = useTypedSelector(state => state);
  const dispatch = useDispatch();

  const deck_id = route.params.deck_id;
  const deck = decks[deck_id];

  const onPressStart = () => {
    if (deck.questions.length === 0) {
      return alert("Add cards to start a quiz");
    }
    return navigation.navigate("Quiz", { deck_id });
  };

  const handleDelete = () => {
    dispatch(deleteDeck(deck_id));
    removeDeck(deck_id);

    return navigation.navigate("Decks");
  };

  if (!deck) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <TouchableOpacity style={styles.trash} onPress={handleDelete}>
        <FontAwesome name="trash-o" size={30} color={colors.gray} />
      </TouchableOpacity>

      <View style={styles.deckHeader}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.text}>{deck.questions.length} cards</Text>
      </View>
      <Button
        onPress={() => navigation.navigate("New Card", { deck_id })}
        title="Add new card"
      />
      <Button onPress={onPressStart} title="Start quiz" />
      <View>
        <Text style={styles.subtitle}>Cards added to this deck:</Text>
        {deck.questions.length === 0 ? (
          <View style={styles.noCardsContainer}>
            <Text style={styles.noCardsMessage}>
              You don't have any cards yet
            </Text>
            <Text style={styles.noCardsMessage}>
              Add a card to be able to start a quiz
            </Text>
          </View>
        ) : (
          deck.questions.map((card, index) => (
            <Card key={index} card={card} deck={deck} index={index} />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  trash: {
    alignSelf: "flex-end",
    margin: 10
  },
  deckHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    height: 120
  },
  text: {
    fontSize: 20,
    textAlign: "center"
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    padding: 10
  },
  subtitle: {
    fontSize: 22,
    textAlign: "center",
    padding: 10,
    marginTop: 20
  },
  noCardsMessage: {
    textAlign: "center",
    fontSize: 20,
    color: colors.gray
  },
  noCardsContainer: {
    flex: 1,
    justifyContent: "center",
    height: 200
  }
});
