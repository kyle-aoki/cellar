import { View } from "./redux";
import { ViewStyle } from "./styled";
import Editor from "@monaco-editor/react";

const DisableCursorCss = "";

export default function ViewComponent() {
  const { content } = View.useState();
  return (
    <ViewStyle.Container>
      <ViewStyle.ControlBar>
          <ViewStyle.Button>Copy</ViewStyle.Button>
          <ViewStyle.Button>Create New Version</ViewStyle.Button>
          <ViewStyle.Button>Close</ViewStyle.Button>
      </ViewStyle.ControlBar>
      <ViewStyle.EditorContainer>
        <ViewStyle.Outer>
          <ViewStyle.Inner showCursor={false}>
            <Editor
              theme="vs-dark"
              defaultLanguage="json"
              options={{ readOnly: true }}
              value={content}
            />
          </ViewStyle.Inner>
        </ViewStyle.Outer>
      </ViewStyle.EditorContainer>
    </ViewStyle.Container>
  );
}
