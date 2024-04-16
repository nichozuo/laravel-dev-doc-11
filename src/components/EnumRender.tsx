import { parseEnum } from "@/utils/parseHelper";
import { useMyState } from "@/valtio/state";
import { Flex, Space, Table, Tag, Typography } from "antd";
import "github-markdown-css/github-markdown-light.css";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { OpenApiType } from "typings";
import MyColorPicker from "./MyColorPicker";

export default function EnumRender() {
  const { snap } = useMyState();
  const [model, setModel] = React.useState<ReturnType<typeof parseEnum>>();
  const [phpCode, setPhpCode] = React.useState<string>("# PHP代码");

  useEffect(() => {
    // console.log(snap.session.main, snap.session.sub);
    if (!snap.session.main || !snap.session.sub) return;
    if (snap.session.main !== "enum") return;
    setModel(parseEnum(snap.session.openapi as OpenApiType, snap.session.sub));
  }, [snap.session.main, snap.session.sub]);

  useEffect(() => {
    const consts = model?.properties.map((item) => {
      return `    /**\n     * @label ${item.label}\n     * @color ${item.color}\n     */\n    case ${item.value} = '${item.value}';`;
    });
    const constsStr = consts?.join("\n\n") ?? "";
    const markdownBody = `\`\`\`php
<?php

namespace App\\Enums;

use LaravelDev\\Traits\\EnumTrait;

/**
 * @intro 状态
 * @field status
 */
enum AdminsStatusEnum: string
{
    use EnumTrait;

${constsStr}
}
\`\`\`
`;
    setPhpCode(markdownBody);
  }, [model]);

  return (
    <Flex vertical>
      <Typography.Title level={4}># {model?.title}</Typography.Title>
      <Table
        rowKey={(item) => item.value as string}
        pagination={false}
        size="small"
        columns={[
          {
            title: "color",
            width: "250px",
            render: (_, item, index) => {
              return (
                <Space>
                  <MyColorPicker
                    format="hex"
                    value={item.color}
                    onChangeComplete={(value) => {
                      console.log(value.toHexString());
                      const newProperties = model?.properties ?? [];
                      newProperties[index].color = value.toHexString();
                      setModel({
                        title: model?.title ?? "",
                        properties: newProperties,
                      });
                    }}
                  />
                  <span>HEX: {item.color}</span>
                </Space>
              );
            },
          },
          {
            title: "text",
            width: "250px",
            render: (_, item) => {
              return <Tag color={item.color}>{item.label}</Tag>;
            },
          },
          { title: "value", dataIndex: "value" },
        ]}
        dataSource={model?.properties}
      />

      <Typography.Title level={4} copyable={{ text: phpCode }}>
        # PHP代码
      </Typography.Title>
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{phpCode}</ReactMarkdown>
      </div>
      <div style={{ height: "50px" }}></div>
    </Flex>
  );
}
