import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { CodingChallenge } from "../components/CodingChallenge";

export function ReduxProvider({
  context,
}: {
  context: WebPartContext;
}): React.ReactElement {
  return (
    <Provider store={store}>
      <CodingChallenge context={context} />
    </Provider>
  );
}
