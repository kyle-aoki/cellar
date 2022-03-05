import { useSelector } from "react-redux";
import { GlobalState } from "..";
import { Ac, BaseDispatcher, f, sf } from "../redux/config";

export namespace View {
  export interface State {
    content: string;
  }
  export const initialState = {
    content: "",
  };

  export const useState = () => useSelector((state: GlobalState) => state.View);

  export function Reducer(state: State = initialState, action: Ac) {
    // prettier-ignore
    switch (action.type) {
    case Action.SetContent.type: return Action.SetContent.lg(state, action);
    default: return state;
    }
  }

  export namespace Action {
    export const SetContent = f((state: State, action: Ac) => {
      return { ...state, content: action.data.content };
    });
  }

  export class Executor extends BaseDispatcher {
    SetContent = (content: string) => this.x(Action.SetContent.ac({ content }));
  }
}
