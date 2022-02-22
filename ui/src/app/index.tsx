import React from "react";
import FileSystemComponent from "../filesystem";
import NavbarComponent from "../navbar";
import SplitViewComponent from "../splitview";
import ViewComponent from "../view";
import { GlobalStyles } from "./global-styles";
import { App } from "./styled";

export default function RootComponent() {
  return (
    <>
      <GlobalStyles />
      <App.Container>
        <NavbarComponent />
        <SplitViewComponent>
          <FileSystemComponent />
          <ViewComponent />
        </SplitViewComponent>
      </App.Container>
    </>
  );
}
