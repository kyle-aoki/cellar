import { takeEvery } from "redux-saga/effects";
import { sagaMiddleware } from "..";
import MiddlewareRegistry from "./middleware-registry";

type Exec = any;

export class BaseExecutor {
  exec: Exec;
  constructor(exec: Exec) {
    this.exec = exec;
  }
}

class Iterator {
  static count: number = 0;
  static next(): number {
    Iterator.count += 1;
    return Iterator.count;
  }
}

type LogicFunc = (state: any, action: BaseAction) => any;

export function init(logic: LogicFunc) {
  const type = Iterator.next();
  return {
    type,
    createAction: (payload?: any) => ({ type, payload }),
    logic,
  };
}

export interface BaseAction {
  type: number;
  payload: any;
}

export function initSaga(worker: (action: any) => any) {
  const type = Iterator.next().toString();
  MiddlewareRegistry.add(function* () {
    yield takeEvery(type, worker);
  });
  return {
    type,
    action: (payload?: any) => ({
      type,
      payload,
    }),
  };
}
