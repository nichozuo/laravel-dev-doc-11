import { parseDB } from "@/utils/parseHelper";
import { useMyState } from "@/valtio/state";
import { Table, Typography } from "antd";
import React, { useEffect } from "react";
import { OpenApiType } from "typings";

export default function DBRender() {
  const { snap } = useMyState();
  const [model, setModel] = React.useState<ReturnType<typeof parseDB>>();

  useEffect(() => {
    // console.log(snap.session.main, snap.session.sub);
    if (!snap.session.main || !snap.session.sub) return;
    if (snap.session.main !== "db") return;
    setModel(parseDB(snap.session.openapi as OpenApiType, snap.session.sub));
  }, [snap.session.main, snap.session.sub]);

  return (
    <>
      <Typography.Title level={4}># {model?.title}</Typography.Title>
      <Table
        rowKey={(item) => item.name as string}
        pagination={false}
        size="small"
        columns={[
          { title: "参数名", dataIndex: "name" },
          { title: "类型", dataIndex: "type" },
          { title: "是否必须", dataIndex: "required" },
          { title: "描述", dataIndex: "description" },
        ]}
        dataSource={model?.properties}
      />
      <div style={{ height: "50px" }}></div>
    </>
  );
}
