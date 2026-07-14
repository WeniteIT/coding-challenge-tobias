import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../store/slice";
import { PrimaryButton, Stack, Text } from "@fluentui/react";
import { RootState } from "../store/store";

export function CodingChallengeComponent(): React.ReactElement {
  const { counter, context } = useSelector((state: RootState) => ({
    counter: state.counter.value,
    context: state.spfx.context,
  }));
  const dispatch = useDispatch();

  return (
    <Stack
      tokens={{ childrenGap: 10 }}
      horizontalAlign="space-between"
      verticalAlign="center"
      horizontal
    >
      <Text>Zähler: {counter || 0}</Text>
      <Text>Site: {context?.pageContext.web.title || "N/A"}</Text>
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        horizontal
        tokens={{ childrenGap: 10 }}
      >
        <PrimaryButton onClick={() => dispatch(increment())}>+</PrimaryButton>
        <PrimaryButton onClick={() => dispatch(decrement())}>-</PrimaryButton>
      </Stack>
    </Stack>
  );
}
