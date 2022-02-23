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
  const { showCreateModal, modalType, path, shouldUpdate } = FileSystemRedux.useState();

  useEffect(() => {
    FileSystemExecutor.Saga.Search(path);
  }, [path, shouldUpdate]);

  return (
    <>
      <FileSystem.Container>
        <ControlBarC />
        <PathBarC />
        <FileSystem.ObjectContainer>
          <FsObjectCs />
        </FileSystem.ObjectContainer>
        {showCreateModal && modalType == FileSystemRedux.ModalType.FOLDER && (
          <CreateModal modalType={FileSystemRedux.ModalType.FOLDER} />
        )}
        {showCreateModal && modalType == FileSystemRedux.ModalType.FILE && (
          <CreateModal modalType={FileSystemRedux.ModalType.FILE} />
        )}
      </FileSystem.Container>
    </>
  );
}
