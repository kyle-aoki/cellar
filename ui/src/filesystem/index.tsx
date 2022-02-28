import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ControlBarC from "./control-bar";
import CreateModal from "./create";
import { FsObjectComponents as FsObjectCs } from "./fs-object";
import PathBarC from "./pathbar";
import { FileSystem } from "./redux";
import { FileSystemSt } from "./styled";

export default function FileSystemComponent() {
  const FileSystemExecutor = new FileSystem.Executor(useDispatch());
  const { showCreateModal, modalType, path, shouldUpdate } = FileSystem.useState();

  useEffect(() => {
    FileSystemExecutor.Saga.Search(path);
  }, [path, shouldUpdate]);

  return (
    <>
      <FileSystemSt.Container>
        <ControlBarC />
        <PathBarC />
        <FileSystemSt.ObjectContainer>
          <FsObjectCs />
        </FileSystemSt.ObjectContainer>
        {showCreateModal && modalType == FileSystem.ModalType.FOLDER && (
          <CreateModal modalType={FileSystem.ModalType.FOLDER} />
        )}
        {showCreateModal && modalType == FileSystem.ModalType.FILE && (
          <CreateModal modalType={FileSystem.ModalType.FILE} />
        )}
      </FileSystemSt.Container>
    </>
  );
}
