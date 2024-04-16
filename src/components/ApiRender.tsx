import { parseApi } from "@/utils/parseHelper";
import { useMyState } from "@/valtio/state";
import { Flex, Space, Table, Tag, Typography } from "antd";
import React, { useEffect } from "react";
import ReactJson from "react-json-view";
import { OpenApiType } from "typings";
const { Title } = Typography;

export default function ApiRender() {
  const { snap } = useMyState();
  const [model, setModel] = React.useState<ReturnType<typeof parseApi>>();

  useEffect(() => {
    // console.log(snap.session.main, snap.session.sub);
    if (!snap.session.main || !snap.session.sub) return;
    if (snap.session.main !== "api") return;
    setModel(parseApi(snap.session.openapi as OpenApiType, snap.session.sub));
  }, [snap.session.main, snap.session.sub]);

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <Flex
        justify="between"
        style={{
          border: "1px solid #D7D7D7",
          width: "100%",
          borderRadius: "40px",
          padding: "5px",
        }}
      >
        <Tag
          color="#02A7F0"
          style={{
            fontSize: "16px",
            borderRadius: "40px",
            padding: "0 20px",
            lineHeight: "26px",
          }}
        >
          {model?.method}
        </Tag>
        <Title
          level={5}
          copyable
          style={{
            flex: 1,
            margin: 0,
            lineHeight: "26px",
          }}
        >
          {model?.uri}
        </Title>
      </Flex>

      <Typography.Title level={4}># 请求参数</Typography.Title>
      {model && model.requestBody.length > 0 && (
        <Table
          size="small"
          rowKey={(item) => item.name as string}
          pagination={false}
          dataSource={model?.requestBody}
          columns={[
            { title: "参数名", dataIndex: "name" },
            { title: "类型", dataIndex: "type" },
            { title: "是否必须", dataIndex: "required" },
            { title: "描述", dataIndex: "description" },
          ]}
        />
      )}

      <Typography.Title level={4}># 响应参数</Typography.Title>
      {model && model?.responseBody.length > 0 && (
        <Table
          rowKey={(item) => item.name as string}
          pagination={false}
          size="small"
          expandable={{
            defaultExpandAllRows: true,
          }}
          columns={[
            { title: "参数名", dataIndex: "name" },
            { title: "类型", dataIndex: "type" },
            { title: "是否必须", dataIndex: "required" },
            { title: "描述", dataIndex: "description" },
          ]}
          dataSource={model?.responseBody}
        />
      )}

      <Typography.Title level={4}># 响应示例</Typography.Title>
      {model?.responseJson && (
        <ReactJson
          src={model?.responseJson}
          theme="solarized"
          style={{ maxHeight: "300px", overflow: "auto" }}
          displayObjectSize={false}
          displayDataTypes={false}
        />
      )}

      <div style={{ height: "50px" }}></div>
    </Space>
  );
}
