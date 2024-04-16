import {
  BodyType,
  OpenApiType,
  ParseApiReturnType,
  ParseDBReturnType,
  ParseEnumReturnType,
} from "typings";

export function parseApi(openapi: OpenApiType | undefined, sub: string) {
  let output: ParseApiReturnType = {
    uri: "",
    method: "",
    summary: "",
    description: "",
    requestBody: [],
    responseBody: [],
    responseJson: undefined,
  };
  const path = openapi?.paths[sub];

  for (const method in path) {
    const obj = path[method];
    const { summary, description, requestBody } = obj;

    output.uri = sub;
    output.summary = summary;
    output.description = description;
    output.method = method.toUpperCase();

    if (requestBody !== null) {
      const properties =
        requestBody?.content["application/x-www-form-urlencoded"].schema
          .properties ?? undefined;
      for (const key in properties) {
        const property = properties[key];
        output.requestBody.push({
          name: key,
          type: property?.type,
          required: property?.required ? "Y" : "-",
          description: property?.description,
        } as BodyType);
      }
    }

    if (obj["x-response-json"]) {
      output.responseJson = JSON.parse(obj["x-response-json"]);
    }

    if (obj["x-response-body"]) {
      output.responseBody = JSON.parse(obj["x-response-body"]);
    }
    return output;
  }

  return output;
}

export function parseDB(openapi: OpenApiType | undefined, sub: string) {
  const schema = openapi?.components.schemas[sub] ?? undefined;
  if (schema === undefined) return;

  let output: ParseDBReturnType = {
    title: schema.title,
    properties: schema.properties.map((item) => {
      return {
        name: item.name,
        type: item.type,
        required: item.required ? "Y" : "-",
        description: item.description,
      };
    }),
  };

  return output;
}

export function parseEnum(openapi: OpenApiType | undefined, sub: string) {
  const schema = openapi?.components.schemas[sub] ?? undefined;
  if (schema === undefined) return;

  let output: ParseEnumReturnType = {
    title: schema.title,
    properties: schema.properties.map((item) => {
      return {
        label: item.label,
        value: item.value,
        color: item.color,
        textColor: item.textColor,
      };
    }),
  };

  return output;
}
