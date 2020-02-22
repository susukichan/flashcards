import "react-native-gesture-handler";
import React, { FC } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { DeckList } from "./src/components/DeckList";
import { NewDeck } from "./src/components/NewDeck";
import { Card } from "./src/components/Card";
import { NewCard } from "./src/components/NewCard";
import { Deck } from "./src/components/Deck";
import { Quiz } from "./src/components/Quiz";
import { reducer } from "./src/reducers/reducer";
import { RootStackParamList } from "./src/navigation";

const Stack = createStackNavigator<RootStackParamList>();
const store = createStore(reducer);

const App: FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Decks">
          <Stack.Screen
            name="Decks"
            component={DeckList}
            options={{ title: "Home" }}
          />
          <Stack.Screen name="New Deck" component={NewDeck} />
          <Stack.Screen name="Deck" component={Deck} />
          <Stack.Screen name="New Card" component={NewCard} />
          <Stack.Screen name="Card" component={Card} />
          <Stack.Screen name="Quiz" component={Quiz} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
