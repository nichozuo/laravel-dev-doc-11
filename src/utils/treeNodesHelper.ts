import { OpenApiType, TreeNode } from "typings";

function getIntro(openapi: OpenApiType, key: string) {
  const tag = openapi.tags?.find((tag) => "/" + tag.name === key);
  if (tag) return tag.description;
  return "";
}

export function convertToApiTree(openapi: OpenApiType) {
  const root: TreeNode = {
    title: "",
    children: [],
    isLeaf: false,
    key: "",
    intro: "",
  };

  for (const [path, methods] of Object.entries(openapi.paths)) {
    for (const method of Object.values(methods)) {
      const tags = method.tags[0].split("/");
      let current = root;
      for (const tag of tags) {
        const existingChild = current.children?.find(
          (child) => child.title === tag
        );
        if (existingChild) {
          current = existingChild;
        } else {
          const newChild: TreeNode = {
            title: tag,
            children: [],
            isLeaf: false,
            key: current.key + "/" + tag,
            intro: "",
          };
          newChild.intro = getIntro(openapi, newChild.key);
          current.children?.push(newChild);
          current = newChild;
        }
      }
      current.children?.push({
        title: method.summary,
        children: [],
        isLeaf: true,
        key: path,
        intro: method.description,
      });
    }
  }

  return root.children as TreeNode[];
}

export function convertToDBTree(openapi: OpenApiType) {
  const output = [];
  const input = openapi.components.schemas;
  for (const key in input) {
    if (input[key]["x-type"] !== "database") continue;
    const { title } = input[key];
    output.push({
      title: key,
      key,
      intro: title,
      isLeaf: true,
    });
  }
  return output as TreeNode[];
}

export function convertToEnumTree(openapi: OpenApiType) {
  const output = [];
  const input = openapi.components.schemas;
  for (const key in input) {
    if (input[key]["x-type"] !== "enum") continue;
    const { title } = input[key];
    output.push({
      title: key,
      key,
      intro: title,
      isLeaf: true,
    });
  }
  return output as TreeNode[];
}

export async function convertToDocTree() {
  const response = await fetch(
    "https://raw.githubusercontent.com/nichozuo/laravel-dev-doc-11/main/src/category.json"
  );
  const data = await response.json();
  console.log("convertToDocTree", data);
  return data;
}

export function convertToErTree(openapi: OpenApiType) {
  const maps = openapi["map"] ?? undefined;
  console.log("maps", maps.items);
  if (!maps) return [];
  return maps.items;
}
