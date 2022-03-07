import { takeEvery } from "redux-saga/effects";
import MiddlewareRegistry from "./middleware-registry";

// dispatch instance or put function
type Exec = any;

export class BaseExer {
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

type IReducer = (st: any, ac: Ac) => any;

export const ActionRegistry: any = {};

export function BuildReducer(actionRegistry: any, initialState: any): IReducer {
  function Reducer(st = initialState, ac: Ac) {
    if (typeof ac.type !== "number") return st;
    const lg = actionRegistry[ac.type];
    if (!lg) return { ...st };
    return lg(st, ac);
  }
  return Reducer;
}

type LogicFunc = (state: any, action: Ac) => any;

interface GenericPayload {
  type: number;
  data: any;
}

interface ActionSet {
  type: number;
  ac: (data?: any) => GenericPayload;
  lg: LogicFunc;
}

type ActionSetFunc = (lg: LogicFunc) => ActionSet;

export function ActionBuilder(ar: any): ActionSetFunc {
  function f(lg: LogicFunc) {
    const type = ActionTypeIterator.next();
    ar[type] = lg;
    return { type, ac: (data?: any) => ({ type, data }), lg };
  }
  return f;
}

export function InitReducer(initialState: any): [ActionSetFunc, IReducer] {
  const ar = {};
  const Reducer = BuildReducer(ar, initialState);
  const asf = ActionBuilder(ar);
  return [asf, Reducer];
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
