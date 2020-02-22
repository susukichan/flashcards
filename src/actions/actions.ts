import { HasDecks, Card } from "../utility/api";

export const receiveDecks = (decks: HasDecks["decks"]) => ({
  type: "RECEIVE_DECKS" as const,
  decks
});

export const saveDeckTitleAction = (deck: HasDecks["decks"][string]) => ({
  type: "SAVE_DECK_TITLE" as const,
  deck
});

export const addCardToDeckAction = (card: Card) => ({
  type: "ADD_CARD_TO_DECK" as const,
  card
});

export const deleteDeck = (deck_id: HasDecks["decks"][string]["deck_id"]) => ({
  type: "DELETE_DECK" as const,
  deck_id
});

export type DeckAction =
  | ReturnType<typeof receiveDecks>
  | ReturnType<typeof saveDeckTitleAction>
  | ReturnType<typeof addCardToDeckAction>
  | ReturnType<typeof deleteDeck>;
