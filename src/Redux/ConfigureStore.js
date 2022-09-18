import { createStore, combineReducers } from "redux";

import { main_reducer } from "./Reducers/reducers";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({ main_reducer }),
  );

  return store;
};