import * as React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { CounterState, increment } from "../store/slice";
import { PrimaryButton, Stack, Text } from "@fluentui/react";
import { store } from "../store/store";

export default function CodingChallenge(): React.ReactElement {
  return (
    <Provider store={store}>
      <CodingChallengeComponent />
    </Provider>
  );
}

function CodingChallengeComponent(): React.ReactElement {
  const counter = useSelector((state: CounterState) => state.value);
  const dispatch = useDispatch();

  return (
    <Stack>
      <Text>Zähler: {counter}</Text>
      <PrimaryButton onClick={() => dispatch(increment())}>
        Inkrementieren
      </PrimaryButton>
    </Stack>
  );
}
