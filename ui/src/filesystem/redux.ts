import { Ac, BaseDispatcher as BaseExer, f, sf } from "../redux/config";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import API from "../api";
import FsObject from "../model/fsobject";
import { useSelector } from "react-redux";
import { GlobalState } from "..";
import { View } from "../view/redux";

export namespace FileSystem {
  export enum ModalType {
    FILE,
    FOLDER,
  }
  export interface St {
    prevPaths: string[];
    path: string;
    shouldUpdate: number;
    objects: FsObject[];
    createModal: boolean;
    modalType: ModalType;
  }
  export const initialSt: St = {
    prevPaths: [],
    path: "/",
    shouldUpdate: 0,
    objects: [],
    createModal: false,
    modalType: ModalType.FOLDER,
  };
  export const workingSt: St = { ...initialSt };
  export const useSt = () => useSelector((st: GlobalState) => st.FileSystem);

  // Actions
  const Default = f((st: St, _: Ac) => ({ ...st }));
  const ShouldUpdate = f((st: St, _: Ac) => ({ ...st, shouldUpdate: st.shouldUpdate + 1 }));
  const SetObjects = f((st: St, ac: Ac) => ({ ...st, objects: ac.data.fsObjects }));
  const ToggleModal = f((st: St, ac: Ac) => ({ ...st, createModal: !st.createModal, modalType: ac.data.modalType }));

  const FolderClick = f((st: St, ac: Ac) => {
    st.prevPaths.push(st.path);
    if (st.path === "/") {
      return { ...st, path: `/${ac.data.name}` };
    }
    return { ...st, path: `${st.path}/${ac.data.name}` };
  });

  const ChangeDirDown = f((st: St, ac: Ac) => {
    if (st.path === "/") return { ...st };
    return { ...st, path: st.prevPaths.pop() };
  });

  // Saga
  const Search = sf(function* (ac: any): any {
    const executor = new Exer(put);
    try {
      const fsObjects = yield call(API.search, {
        path: ac.data.path,
      } as FsObject);
      yield executor.SetObjects(fsObjects);
    } catch (e: any) {
      yield executor.Default();
    }
  });
  const CreateFolder = sf(function* (ac: any): any {
    const exec = new Exer(put);
    const newFsObject: FsObject = {
      name: ac.data.name,
      path: ac.data.st.path,
      file: false,
      content: null,
    };
    yield call(API.create, newFsObject);
    yield exec.ToggleModal(ModalType.FOLDER);
    yield exec.ShouldUpdate();
  });
  const CreateFile = sf(function* (ac: any): any {
    const exec = new Exer(put);
    const newFsObject: FsObject = {
      name: ac.data.name,
      path: ac.data.st.path,
      file: true,
      content: "LMFAO",
    };
    yield call(API.create, newFsObject);
    yield exec.ToggleModal(ModalType.FILE);
    yield exec.ShouldUpdate();
  });
  const FindFile = sf(function* (ac: any): any {
    const ViewExec = new View.Executor(put);
    const response = yield call(API.find, ac.data);
    yield ViewExec.SetContent(response.content);
  });

  export class Exer extends BaseExer {
    Default = () => this.x(Default.ac());
    SetObjects = (fsObjects: FsObject[]) => this.x(SetObjects.ac({ fsObjects }));
    ToggleModal = (modalType: ModalType) => this.x(ToggleModal.ac({ modalType }));
    FolderClick = (name: string) => this.x(FolderClick.ac({ name }));
    ChangeDirDown = () => this.x(ChangeDirDown.ac());
    ShouldUpdate = () => this.x(ShouldUpdate.ac());

    // Saga
    CreateFolder = (name: string, st: St) => this.x(CreateFolder.ac({ name, st }));
    CreateFile = (name: string, st: St) => this.x(CreateFile.ac({ name, st }));
    Search = (path: string) => this.x(Search.ac({ path }));
    FindFile = (name: string, path: string) => this.x(FindFile.ac({ name, path }));
  }

  export function Reducer(st: St = workingSt, ac: Ac) {
    // prettier-ignore
    switch (ac.type) {
        case SetObjects.type:     return SetObjects.lg(st, ac);
        case ToggleModal.type:    return ToggleModal.lg(st, ac);
        case FolderClick.type:    return FolderClick.lg(st, ac);
        case ChangeDirDown.type:  return ChangeDirDown.lg(st, ac);
        case ShouldUpdate.type:   return ShouldUpdate.lg(st, ac);
        default:                  return Default.lg(st, ac);
    }
  }
}
