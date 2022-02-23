import { BaseAction, BaseExecutor, init, initSaga } from "../redux/config";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import API from "../api";
import FsObject from "../model/fsobject";
import { useSelector } from "react-redux";
import { GlobalState } from "..";
import { View } from "../view/redux";

export namespace FileSystemRedux {
  export enum ModalType {
    FILE,
    FOLDER,
  }
  export interface State {
    prevPaths: string[];
    path: string;
    shouldUpdate: number;
    objects: FsObject[];
    showCreateModal: boolean;
    modalType: ModalType;
  }
  export const initialState: State = {
    prevPaths: [],
    path: "/",
    shouldUpdate: 0,
    objects: [],
    showCreateModal: false,
    modalType: ModalType.FOLDER,
  };
  export const workingState: State = { ...initialState };
  export const useState = () => useSelector((state: GlobalState) => state.FileSystem);

  export namespace Action {
    export const Default = init((state: State, action: BaseAction) => {
      return { ...state };
    });
    export const ShouldUpdate = init((state: State, action: BaseAction) => {
      return { ...state, shouldUpdate: state.shouldUpdate + 1 };
    });
    export const SetObjects = init((state: State, action: BaseAction) => {
      return { ...state, objects: action.payload.fsObjects };
    });
    export const ToggleModal = init((state: State, action: BaseAction) => {
      state.showCreateModal = !state.showCreateModal;
      state.modalType = action.payload.modalType;
      return { ...state };
    });
    export const FolderClick = init((state: State, action: BaseAction) => {
      state.prevPaths.push(state.path);
      if (state.path === "/") {
        return { ...state, path: `/${action.payload.name}` };
      }
      return { ...state, path: `${state.path}/${action.payload.name}` };
    });
    export const ChangeDirDown = init((state: State, action: BaseAction) => {
      if (state.path === "/") return { ...state };
      return { ...state, path: state.prevPaths.pop() };
    });
    export const AddFile = init((state: State, action: BaseAction) => {});
  }

  export namespace Saga {
    export const Search = initSaga(function* (action: any): any {
      const executor = new Executor(put);
      try {
        const fsObjects = yield call(API.search, {
          path: action.payload.path,
        } as FsObject);
        yield executor.SetObjects(fsObjects);
      } catch (e: any) {
        yield executor.Default();
      }
    });
    export const CreateFolder = initSaga(function* (action: any): any {
      const exec = new Executor(put);
      const newFsObject: FsObject = {
        name: action.payload.name,
        path: action.payload.state.path,
        file: false,
        content: null,
      };
      yield call(API.create, newFsObject);
      yield exec.ToggleModal(ModalType.FOLDER);
      yield exec.ShouldUpdate();
    });
    export const CreateFile = initSaga(function* (action: any): any {
      const exec = new Executor(put);
      const newFsObject: FsObject = {
        name: action.payload.name,
        path: action.payload.state.path,
        file: true,
        content: "LMFAO",
      };
      yield call(API.create, newFsObject);
      yield exec.ToggleModal(ModalType.FILE);
      yield exec.ShouldUpdate();
    });
    export const FindFile = initSaga(function* (action: any): any {
      const ViewExec = new View.Executor(put);
      const response = yield call(API.find, action.payload);
      yield ViewExec.SetContent(response.content);
    });
  }

  export function Reducer(state: State = workingState, action: BaseAction) {
    // prettier-ignore
    switch (action.type) {
        case Action.SetObjects.type: return Action.SetObjects.logic(state, action);
        case Action.ToggleModal.type: return Action.ToggleModal.logic(state, action);
        case Action.FolderClick.type: return Action.FolderClick.logic(state, action);
        case Action.ChangeDirDown.type: return Action.ChangeDirDown.logic(state, action);
        case Action.AddFile.type: return Action.AddFile.logic(state, action);
        case Action.ShouldUpdate.type: return Action.ShouldUpdate.logic(state, action);
        
        default: return Action.Default.logic(state, action);
    }
  }

  export class Executor extends BaseExecutor {
    Default = () => this.exec(Action.Default.createAction());
    SetObjects = (fsObjects: FsObject[]) =>
      this.exec(Action.SetObjects.createAction({ fsObjects }));
    ToggleModal = (modalType: ModalType) =>
      this.exec(Action.ToggleModal.createAction({ modalType }));
    FolderClick = (name: string) => this.exec(Action.FolderClick.createAction({ name }));
    ChangeDirDown = () => this.exec(Action.ChangeDirDown.createAction());
    AddFile = () => this.exec(Action.AddFile.createAction());
    ShouldUpdate = () => this.exec(Action.ShouldUpdate.createAction());

    Saga = new (class extends BaseExecutor {
      CreateFolder = (name: string, state: State) =>
        this.exec(Saga.CreateFolder.action({ name, state }));
      CreateFile = (name: string, state: State) =>
        this.exec(Saga.CreateFile.action({ name, state }));
      Search = (path: string) => this.exec(Saga.Search.action({ path }));
      FindFile = (name: string, path: string) => this.exec(Saga.FindFile.action({ name, path }));
    })(this.exec);
  }
}
