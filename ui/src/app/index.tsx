import React from "react";
import FileSystemCmpt from "../filesystem";
import NavbarCmpt from "../navbar";
import SplitViewCmpt from "../splitview";
import ViewCmpt from "../view";
import { GlobalStyles } from "./global-styles";
import { App } from "./styled";

export default function RootComponent() {
    
  return (
    <>
      <GlobalStyles />
      <App.Container>
        <NavbarCmpt />
        <SplitViewCmpt>
          <FileSystemCmpt />
          <ViewCmpt />
        </SplitViewCmpt>
      </App.Container>
    </>
  );
}
