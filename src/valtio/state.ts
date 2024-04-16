import { SessionType } from "typings";
import { proxy, useSnapshot } from "valtio";

const session: SessionType = proxy({
  openapi: undefined,

  apiTree: [],
  dbTree: [],
  enumTree: [{ title: "Enum", key: "enum", isLeaf: true }],
  docTree: [{ title: "Docs", key: "docs", isLeaf: true }],

  main: "api",
  sub: undefined,

  error: undefined,
  loading: 1,
});

export const state = proxy({
  session,
});

export function useMyState() {
  const snap = useSnapshot(state);
  return { snap };
}
