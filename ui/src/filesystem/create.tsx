import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FileSystem } from "./redux";

export namespace Create {
  export const Backdrop = styled.div`
    position: absolute;
    height: calc(100vh - 40px);
    width: 100vw;
    background-color: #00000044;
  `;
  export const Container = styled.div`
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -30%);
    height: 150px;
    width: 300px;
    background-color: rgb(31, 28, 38);
    border-radius: 8px;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 0.5px solid rgb(103, 95, 102);
    box-shadow: 0 0 0 1px black;
  `;
  export const Taskbar = styled.div`
    height: 28px;
    width: 100%;
    background-color: rgb(54, 52, 60);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom: 1px solid rgb(17, 12, 16);
    display: flex;
    align-items: center;
    padding-left: 10px;
    gap: 9px;
    margin-bottom: 10px;
  `;
  export const CircleButton = styled.div<any>`
    height: 12px;
    width: 12px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
    :active {
      background-color: ${(props) => props.activeColor};
    }
  `;
  export const CreateInputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `;
  export const Input = styled.input`
    outline: none;
    border: none;
    background-color: rgb(53, 51, 59);
    border-radius: 4px;
  `;
  export const Button = styled.div`
    background-color: rgb(91, 86, 95);
    font-family: monospace;
    padding: 1px 10px;
    font-size: 12px;
    border-radius: 4px;
    color: white;
  `;
}

export default function CreateModal({ modalType }: { modalType: FileSystem.ModalType }) {
  const FsExecutor = new FileSystem.Executor(useDispatch());
  const State = FileSystem.useState();
  const [newObjectName, setNewObjectName] = useState("");
  function onClick() {
    if (modalType === FileSystem.ModalType.FILE) {
      FsExecutor.Saga.CreateFile(newObjectName, State);
    } else {
      FsExecutor.Saga.CreateFolder(newObjectName, State);
    }
  }
  return (
    <>
      <Create.Backdrop />
      <Create.Container>
        <Create.Taskbar>
          <Create.CircleButton
            color={"rgb(255, 95, 87)"}
            activeColor={"rgb(255, 141, 133)"}
            onClick={() => FsExecutor.ToggleModal(modalType)}
          />
          <Create.CircleButton color={"rgb(91, 88, 95)"} />
          <Create.CircleButton color={"rgb(91, 88, 95)"} />
        </Create.Taskbar>
        <Create.CreateInputContainer>
          <Create.Input onChange={(e) => setNewObjectName(e.target.value)} />
          <Create.Button onClick={onClick}>Create</Create.Button>
        </Create.CreateInputContainer>
      </Create.Container>
    </>
  );
}
