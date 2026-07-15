/* eslint-disable @typescript-eslint/no-floating-promises */

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DetailsList, Spinner, Stack, Text } from "@fluentui/react";
import { RootState } from "../store/store";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getLists } from "../service/getLists";
import { setLists } from "../store/listsSlice";
interface UserGroupsProps {
  context: WebPartContext;
}

export function Lists({ context }: UserGroupsProps): React.ReactElement {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const { lists } = useSelector((state: RootState) => ({
    lists: state.list,
  }));

  React.useEffect(() => {
    (async () => {
      try {
        const lists = await getLists(context);
        dispatch(setLists(lists));
      } catch (error) {
        console.error("Error creating SP instance:", error);
        setError("Failed to load available lists");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (error) {
    return (
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        styles={{ root: { height: "100%" } }}
      >
        <Text variant="medium" styles={{ root: { color: "red" } }}>
          {error}
        </Text>
      </Stack>
    );
  }

  if (isLoading) {
    return (
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        styles={{ root: { height: "100%" } }}
      >
        <Spinner label="Loading user groups..." />
      </Stack>
    );
  }

  return (
    <Stack tokens={{ childrenGap: 5 }} horizontalAlign="center">
      <Text variant="large" styles={{ root: { fontWeight: "bold" } }}>
        Available Lists on Site
      </Text>
      <DetailsList
        items={lists}
        columns={[
          {
            key: "column1",
            name: "Title",
            fieldName: "Title",
            minWidth: 200,
            maxWidth: 200,
            isMultiline: false,
          },
          {
            key: "column4",
            name: "Items",
            fieldName: "ItemCount",
            minWidth: 200,
            maxWidth: 200,
            isMultiline: false,
          },
          {
            key: "column3",
            name: "BaseTemplate",
            fieldName: "BaseTemplate",
            minWidth: 200,
            maxWidth: 200,
            isMultiline: false,
          },
          {
            key: "column2",
            name: "ID",
            fieldName: "Id",
            minWidth: 200,
            maxWidth: 200,
            isMultiline: false,
          },
        ]}
      />
      <Text variant="large" styles={{ root: { fontWeight: "bold" } }}>
        Document Libraries
      </Text>
      <DetailsList
        items={lists.filter((list) => list.BaseTemplate === 101)}
        columns={[
          {
            key: "column2",
            name: "ID",
            fieldName: "Id",
            minWidth: 200,
            maxWidth: 200,
          },
          {
            key: "column1",
            name: "Title",
            fieldName: "Title",
            minWidth: 200,
            maxWidth: 200,
          },
          {
            key: "column3",
            name: "Description",
            fieldName: "Description",
            minWidth: 200,
            maxWidth: 200,
          },
          {
            key: "column4",
            name: "Url",
            onRender: (item) => item.RootFolder.ServerRelativeUrl,
            minWidth: 200,
            maxWidth: 200,
          },
        ]}
      />
    </Stack>
  );
}
