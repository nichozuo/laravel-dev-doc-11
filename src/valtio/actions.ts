import {
  convertToApiTree,
  convertToDBTree,
  convertToEnumTree,
} from "@/utils/treeNodesHelper";
import { MainMenuValueType } from "typings";
import { request } from "umi";
import { state } from "./state";

const category = require("../category.json");

export const stateActions = {
  getOpenapi: async () => {
    // console.log("start request openapi");
    const res = await request("/api/docs/openapi");
    // console.log("end request openapi", res);

    if (res.success && res.success === false) {
      state.session.loading = 0;
      state.session.error = res.errorMessage;
    } else {
      state.session.openapi = res;
      state.session.loading = 0;
      stateActions.parseTrees(res);
    }
    return {};
  },
  setMain(main: string) {
    state.session.main = main as MainMenuValueType;
  },
  setSub(sub: string | undefined) {
    state.session.sub = sub;
  },
  parseTrees: (openapi: any) => {
    state.session.apiTree = convertToApiTree(openapi);
    state.session.dbTree = convertToDBTree(openapi);
    state.session.enumTree = convertToEnumTree(openapi);
    state.session.docTree = category;
  },
};
