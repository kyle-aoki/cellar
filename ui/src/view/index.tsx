import { View } from "./redux";
import { ViewStyle } from "./styled";
import Editor from "@monaco-editor/react";
import { useDispatch } from "react-redux";

export default function ViewComponent() {
  const ViewExer = new View.Exer(useDispatch());
  const { content, editing } = View.useState();
  return (
    <ViewStyle.Container>
      <ViewStyle.ControlBar>
        <ViewStyle.Button>Close</ViewStyle.Button>
        <ViewStyle.Button>Copy</ViewStyle.Button>
        <ViewStyle.Button onClick={ViewExer.EditingOn}>Create New Version</ViewStyle.Button>
      </ViewStyle.ControlBar>
      <ViewStyle.ControlBar>
        <ViewStyle.Button>Save</ViewStyle.Button>
        <ViewStyle.Button>Discard</ViewStyle.Button>
      </ViewStyle.ControlBar>
      <ViewStyle.EditorContainer>
        <ViewStyle.Outer>
          <ViewStyle.Inner showCursor={editing}>
            <Editor
              theme="vs-dark"
              defaultLanguage="json"
              options={{ readOnly: !editing }}
              value={content}
              onChange={(e) => ViewExer.OnChange(e as string)}
            />
          </ViewStyle.Inner>
        </ViewStyle.Outer>
      </ViewStyle.EditorContainer>
    </ViewStyle.Container>
  );
}
