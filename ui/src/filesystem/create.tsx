import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FileSystemRedux } from "./redux";

export namespace Create {
  export const Container = styled.div`
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -30%);
    height: 150px;
    width: 300px;
    background-color: black;
    border-radius: 8px;
  `;
  export const Input = styled.input``;
  export const Button = styled.button``;
}

export default function CreateModal({ modalType }: { modalType: FileSystemRedux.ModalType }) {
  const FsExecutor = new FileSystemRedux.Executor(useDispatch());
  const State = FileSystemRedux.useState();
  const [newObjectName, setNewObjectName] = useState("");
  function onClick() {
    if (modalType === FileSystemRedux.ModalType.FILE) {
      FsExecutor.Saga.CreateFile(newObjectName, State);
    } else {
      FsExecutor.Saga.CreateFolder(newObjectName, State);
    }
  }
  return (
    <Create.Container>
      <Create.Input onChange={(e) => setNewObjectName(e.target.value)} />
      <Create.Button onClick={onClick}>Create</Create.Button>
    </Create.Container>
  );
}
