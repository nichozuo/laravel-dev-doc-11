import {
  MenuDividerType,
  MenuItemGroupType,
  MenuItemType,
  SubMenuType,
} from "antd/es/menu/hooks/useItems";
import "umi/typings";

type MyMenuItemType =
  | MenuItemType
  | SubMenuType
  | MenuItemGroupType
  | MenuDividerType;

export type TreeNode = {
  title: string;
  key: string;
  intro?: string;
  isLeaf?: boolean;
  children?: TreeNode[];
};

export type SessionType = {
  openapi: OpenApiType | undefined;

  apiTree: TreeNode[];
  dbTree: TreeNode[];
  enumTree: TreeNode[];
  docTree: TreeNode[];
  erTree: TreeNode[];

  main: MainMenuValueType;
  sub: string | undefined;

  error: string | undefined;
  loading: number;
};

export type OpenApiType = {
  paths: {
    [path: string]: {
      [method: string]: {
        tags: string[];
        summary: string;
        description: string;
        "x-response-json"?: string;
        "x-response-body"?: string;
        requestBody?: {
          content: {
            [key: string]: {
              schema: {
                type: string;
                properties: {
                  [key: string]: {
                    required: boolean;
                    type: string;
                    description: string;
                  };
                };
              };
            };
          };
        };
      };
    };
  };
  tags?: {
    name: string;
    description: string;
  }[];
  components: {
    schemas: {
      [key: string]: {
        type: string;
        title: string;
        "x-type"?: string;
        properties: BodyType[];
      };
    };
  };
};

export type StateType = {
  session: SessionType;
};

export type MainMenuValueType = "api" | "db" | "enum" | "doc" | "er";

type BodyType = {
  name?: string;
  type?: string;
  required?: string;
  description?: string;
  default?: string;
  children?: BodyType[];
  label?: string;
  value?: string;
  color?: string;
  textColor?: string;
};

type ParseApiReturnType = {
  uri: string;
  method: string;
  summary: string;
  description: string;
  requestBody: BodyType[];
  responseBody: BodyType[];
  responseJson?: Object;
};

type ParseDBReturnType = {
  title: string;
  properties: BodyType[];
};

type ParseEnumReturnType = {
  title: string;
  phpCode?: string;
  properties: BodyType[];
};
