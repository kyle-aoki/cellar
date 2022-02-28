import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FileSystem } from "./redux";

export namespace PathBar {
  export const Container = styled.div`
    height: 30px;
    background-color: #cecece;
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-family: monospace;
  `;
  export const BackButton = styled.div`
    user-select: none;
    cursor: pointer;
    margin-right: 10px;
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    background-color: #000f80;
    color: white;
    border-radius: 6px;
    :hover {
      filter: brightness(1.25);
    }
    :active {
      filter: brightness(1.5);
    }
  `;
}

export default function PathBarComponent() {
  const FileSystemState = FileSystem.useState();
  const FsExec = new FileSystem.Executor(useDispatch());
  return (
    <PathBar.Container>
      <PathBar.BackButton onClick={() => FsExec.ChangeDirDown()}>{"<"}</PathBar.BackButton>
      {FileSystemState.path}
    </PathBar.Container>
  );
}
