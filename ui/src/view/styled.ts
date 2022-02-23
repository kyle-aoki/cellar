import styled from "styled-components";

export namespace ViewStyle {
  export const Container = styled.div`
    background-color: gray;
  `;
  export const ControlBar = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 10px;
    font-family: monospace;
    font-size: 12px;
  `;
  export const Button = styled.div`
    padding: 2px 10px;
    border-radius: 4px;
    user-select: none;
    color: white;
    background-color: rgb(100, 100, 100);
    :hover {
      background-color: rgb(110, 110, 110);
    }
    :active {
      background-color: rgb(120, 120, 120);
    }
  `;
  export const EditorContainer = styled.div`
    height: calc(100% - 30px);
    width: 100%;
    display: flex;
    background-color: #1e1e1e;
    padding-top: 4px;
  `;

  export const Outer = styled.div`
    height: 100%;
    width: 100%;
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    position: relative;
  `;
  export const Inner = styled.div<any>`
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    overflow: hidden;
    position: absolute;
    .monaco-editor .cursors-layer > .cursor {
      display: ${(props) => (props.showCursor ? "none" : "none !important")};
    }
  `;
}
