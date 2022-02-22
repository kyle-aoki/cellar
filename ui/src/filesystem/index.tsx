import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ControlBarC from "./control-bar";
import CreateModal from "./create";
import { FsObjectComponents as FsObjectCs } from "./fs-object";
import PathBarC from "./pathbar";
import { FileSystemRedux } from "./redux";
import { FileSystem } from "./styled";

export default function FileSystemComponent() {
  const FileSystemExecutor = new FileSystemRedux.Executor(useDispatch());
  const state = FileSystemRedux.useState();

  useEffect(() => {
    FileSystemExecutor.Saga.Search(state.path);
  }, [state.path, state.shouldUpdate]);

  return (
    <>
      <FileSystem.Container>
        <ControlBarC />
        <PathBarC />
        <FileSystem.ObjectContainer>
          <FsObjectCs fsObjects={state.objects} />
          {state.showCreateModal && state.modalType == FileSystemRedux.ModalType.FOLDER && (
            <CreateModal modalType={FileSystemRedux.ModalType.FOLDER} />
          )}
          {state.showCreateModal && state.modalType == FileSystemRedux.ModalType.FILE && (
            <CreateModal modalType={FileSystemRedux.ModalType.FILE} />
          )}
        </FileSystem.ObjectContainer>
      </FileSystem.Container>
    </>
  );
}
