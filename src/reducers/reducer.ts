import { combineReducers } from "redux";
import { decks } from "./decks";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const reducer = combineReducers({ decks });

export type RootState = ReturnType<typeof reducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
