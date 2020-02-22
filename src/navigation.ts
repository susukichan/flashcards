import { HasDecks } from "./utility/api";

type HasDeckId = { deck_id: HasDecks["decks"][string]["deck_id"] };

export type RootStackParamList = {
  Decks: undefined;
  "New Deck": undefined;
  Deck: HasDeckId;
  "New Card": HasDeckId;
  Card: undefined;
  Quiz: HasDeckId;
};
