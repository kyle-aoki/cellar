import { useSelector } from "react-redux";
import { GlobalState } from "..";
import { BaseAction, BaseExecutor, init, initSaga } from "../redux/config";

export namespace View {
  export interface State {
    content: string;
  }
  export const initialState = {
    content: "",
  };

  export const useState = () => useSelector((state: GlobalState) => state.View);

  export function Reducer(state: State = initialState, action: BaseAction) {
    // prettier-ignore
    switch (action.type) {
    case Action.SetContent.type: return Action.SetContent.logic(state, action);
    default: return state;
    }
  }

  export namespace Action {
    export const SetContent = init((state: State, action: BaseAction) => {
      return { ...state, content: action.payload.content };
    });
  }

  export class Executor extends BaseExecutor {
    SetContent = (content: string) => this.exec(Action.SetContent.createAction({ content }));
  }
}
