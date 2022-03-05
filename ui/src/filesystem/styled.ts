import styled from "styled-components";

export namespace SyFileSystem {
  export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #25144a;
    height: 100%;
    /* overflow-y: autso; */
  `;
  export const ObjectContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    height: calc(100vh - 96px);
  `;
}
