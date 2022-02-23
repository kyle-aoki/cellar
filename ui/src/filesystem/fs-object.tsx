import { useDispatch } from "react-redux";
import styled from "styled-components";
import FsObject from "../model/fsobject";
import { View } from "../view/redux";
import { FileSystemRedux } from "./redux";

namespace FOC {
  export const Container = styled.div`
    background-color: #e1e1e1;
    display: flex;
    align-items: center;
    padding-left: 10px;
    height: 20px;
    border-bottom: 1px solid gray;
    user-select: none;
    font-family: monospace;
    :hover {
      filter: brightness(0.95);
    }
    :active {
      filter: brightness(0.9);
    }
  `;
}
export function FsObjectComponent({ fsObject }: { fsObject: FsObject }) {
  const FsExecutor = new FileSystemRedux.Executor(useDispatch());
  function onClick() {
    if (!fsObject.file) {
      FsExecutor.FolderClick(fsObject.name);
    } else {
      FsExecutor.Saga.FindFile(fsObject.name, fsObject.path);
    }
  }
  return (
    <FOC.Container onClick={onClick}>
      {fsObject.file ? "📝 " : "📁 "}
      {fsObject.name}
    </FOC.Container>
  );
}

namespace FOCS {
  export const Container = styled.div`
    display: flex;
    flex-direction: column;
  `;
}
export function FsObjectComponents() {
  const state = FileSystemRedux.useState();
  return (
    <FOCS.Container>
      {state.objects.map((fsObject, index) => (
        <FsObjectComponent key={index} fsObject={fsObject} />
      ))}
    </FOCS.Container>
  );
}
