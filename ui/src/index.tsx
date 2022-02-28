import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import RootComponent from "./app";
import { FileSystem } from "./filesystem/redux";
import MiddlewareRegistry from "./redux/middleware-registry";
import { View } from "./view/redux";

export interface GlobalState {
  FileSystem: FileSystem.State;
  View: View.State;
}

const reducers = combineReducers({
  FileSystem: FileSystem.Reducer,
  View: View.Reducer,
});

export const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

for (const mw of MiddlewareRegistry.getAll()) {
  sagaMiddleware.run(mw);
}

ReactDOM.render(
  <Provider store={store}>
    <RootComponent />
  </Provider>,
  document.getElementById("root")
);
