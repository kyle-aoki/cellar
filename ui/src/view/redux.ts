import { useSelector } from "react-redux";
import { GlobalState } from "..";
import { Content } from "../model/content";
import { Ac, ActionRegistry, BaseExer, BuildReducer, InitReducer, sf } from "../redux/config";

export namespace View {
  export interface St {
    editing: boolean;
    content: string;
  }
  export const initialSt = {
    editing: false,
    content: "",
  };
  export const useState = () => useSelector((state: GlobalState) => state.View);

  export const [f, Reducer] = InitReducer(initialSt);

  const SetContent = f((st: St, ac: Ac): St => ({ ...st, content: ac.data.content.content }));
  const EditingOn = f((st: St, ac: Ac): St => ({ ...st, editing: true }));
  const OnChange = f((st: St, ac: Ac): St => ({ ...st, content: ac.data.newVal }));

  export class Exer extends BaseExer {
    SetContent = (content: Content) => this.x(SetContent.ac({ content }));
    EditingOn = () => this.x(EditingOn.ac());
    OnChange = (newVal: string) => this.x(OnChange.ac({ newVal }));
  }
}
