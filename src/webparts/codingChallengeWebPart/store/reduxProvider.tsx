import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { setContext } from "./spfxSlice";

export function ReduxProvider({
  context,
  children,
}: {
  context: WebPartContext;
  children?: React.ReactNode;
}): React.ReactElement {
  useEffect(() => {
    store.dispatch(setContext(context));
  }, [context]);

  return <Provider store={store}>{children}</Provider>;
}
