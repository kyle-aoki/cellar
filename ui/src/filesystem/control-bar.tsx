import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FileSystem } from "./redux";

export namespace ControlBar {
  export const Container = styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;
    height: 30px;
    background-color: #bbbbbb;
    gap: 20px;
  `;
  export const AddFolderButton = styled.div`
    font-size: 12px;
    font-family: monospace;
    background-color: gray;
    padding: 3px 7px;
    user-select: none;
    cursor: pointer;
    :hover {
      filter: brightness(0.95);
    }
    :active {
      filter: brightness(0.9);
    }
  `;
}

export default function ControlBarComponent() {
  const Executor = new FileSystem.Exer(useDispatch());
  return (
    <ControlBar.Container>
      <ControlBar.AddFolderButton
        onClick={() => Executor.ToggleModal(FileSystem.ModalType.FOLDER)}
      >
        Add Folder
      </ControlBar.AddFolderButton>
      <ControlBar.AddFolderButton
        onClick={() => Executor.ToggleModal(FileSystem.ModalType.FILE)}
      >
        Add File
      </ControlBar.AddFolderButton>
    </ControlBar.Container>
  );
}
