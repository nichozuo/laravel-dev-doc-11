import { useMyState } from "@/valtio/state";
import { Space, Typography } from "antd";
import DirectoryTree from "antd/es/tree/DirectoryTree";
import { useEffect, useState } from "react";
import { TreeNode } from "typings";
import { useSearchParams } from "umi";

export default function LeftTree() {
  const { snap } = useMyState();
  const [, setSearchParams] = useSearchParams();

  const [items, setItems] = useState<TreeNode[]>([]);

  useEffect(() => {
    // console.log("LeftTree useEffect", snap.session.main);
    if (!snap.session.main || !snap.session.openapi) return;
    switch (snap.session.main) {
      case "api":
        setItems(snap.session.apiTree as TreeNode[]);
        break;
      case "db":
        setItems(snap.session.dbTree as TreeNode[]);
        break;
      case "enum":
        setItems(snap.session.enumTree as TreeNode[]);
        break;
      case "doc":
        setItems(snap.session.docTree as TreeNode[]);
        break;
      default:
        setItems([]);
        break;
    }
  }, [snap.session.openapi, snap.session.main]);

  return items.length > 0 ? (
    <DirectoryTree
      showLine
      showIcon={false}
      treeData={items}
      defaultExpandedKeys={[snap.session.sub as string]}
      selectedKeys={[snap.session.sub as string]}
      onSelect={(_keys, event) => {
        const node = event.selectedNodes[0] as any;
        if (node?.isLeaf) {
          setSearchParams({
            main: snap.session.main as string,
            sub: node.key as string,
          });
        }
      }}
      titleRender={(node) => {
        return (
          <Space
            style={{
              lineHeight: "30px",
            }}
          >
            <span>{(node as any)?.title}</span>
            <Typography.Text
              ellipsis={true}
              style={{ color: "#999", lineHeight: "30px" }}
            >
              {(node as any)?.intro}
            </Typography.Text>
          </Space>
        );
      }}
    />
  ) : (
    <></>
  );
}
