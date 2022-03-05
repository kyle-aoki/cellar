import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ControlBarC from "./control-bar";
import CreateModal from "./create";
import { FsObjectComponents as FsObjectCs } from "./fs-object";
import PathBarC from "./pathbar";
import { FileSystem } from "./redux";
import { SyFileSystem } from "./styled";

export default function FileSystemCmpt() {
  const FSExer = new FileSystem.Exer(useDispatch());
  const { createModal, modalType, path, shouldUpdate } = FileSystem.useSt();

  useEffect(() => {
    FSExer.Search(path);
  }, [path, shouldUpdate]);

  return (
    <>
      <SyFileSystem.Container>
        <ControlBarC />
        <PathBarC />
        <SyFileSystem.ObjectContainer>
          <FsObjectCs />
        </SyFileSystem.ObjectContainer>
        {createModal && modalType == FileSystem.ModalType.FOLDER && (
          <CreateModal modalType={FileSystem.ModalType.FOLDER} />
        )}
        {createModal && modalType == FileSystem.ModalType.FILE && (
          <CreateModal modalType={FileSystem.ModalType.FILE} />
        )}
      </SyFileSystem.Container>
    </>
  );
}
