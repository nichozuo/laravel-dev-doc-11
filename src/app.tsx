import React from "react";
import MyRootContainer from "./components/MyRootContainer";
import { stateActions } from "./valtio/actions";

export async function getInitialState() {
  return await stateActions.getOpenapi();
}

export function rootContainer(container: React.ReactNode) {
  return React.createElement(MyRootContainer, null, container);
}
