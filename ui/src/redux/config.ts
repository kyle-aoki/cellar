import { takeEvery } from "redux-saga/effects";
import MiddlewareRegistry from "./middleware-registry";

// dispatch instance or put function
type Exec = any;

export class BaseDispatcher {
  x: Exec;
  constructor(executor: Exec) {
    this.x = executor;
  }
}

class ActionTypeIterator {
  static count: number = 0;
  static next(): number {
    ActionTypeIterator.count += 1;
    return ActionTypeIterator.count;
  }
}

type LogicFunc = (state: any, action: Ac) => any;

export function f(lg: LogicFunc) {
  const type = ActionTypeIterator.next();
  return { type, ac: (data?: any) => ({ type, data }), lg };
}

export interface Ac {
  type: number;
  data: any;
}

export function sf(middlewareFunction: (action: any) => any) {
  const type = ActionTypeIterator.next().toString();

  MiddlewareRegistry.add(function* () {
    yield takeEvery(type, middlewareFunction);
  });

  return { type, ac: (data?: any) => ({ type, data }) };
}
