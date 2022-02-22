import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import RootComponent from "./app";
import { FileSystemRedux } from "./filesystem/redux";
import MiddlewareRegistry from "./redux/middleware-registry";

export interface GlobalState {
  FileSystem: FileSystemRedux.State;
}

const reducers = combineReducers({
  FileSystem: FileSystemRedux.Reducer,
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
