import { stateActions } from "@/valtio/actions";
import { useMyState } from "@/valtio/state";
import {
  ClusterOutlined,
  ConsoleSqlOutlined,
  DatabaseOutlined,
  FileMarkdownOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React from "react";
import { MainMenuValueType } from "typings";
import { useSearchParams } from "umi";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export default function LeftMenu() {
  const { snap } = useMyState();
  const [, setSearchParams] = useSearchParams();

  const onClick: MenuProps["onClick"] = (e) => {
    setSearchParams({ main: e.key });
    stateActions.setMain(e.key as MainMenuValueType);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[snap.session.main]}
      mode="inline"
      items={[
        {
          key: "api",
          title: "API",
          icon: <GlobalOutlined />,
        },
        {
          key: "db",
          title: "Database",
          icon: <DatabaseOutlined />,
        },
        {
          key: "enum",
          title: "Enum",
          icon: <ClusterOutlined />,
        },
        {
          key: "doc",
          title: "Readme",
          icon: <FileMarkdownOutlined />,
        },
        {
          key: "er",
          title: "ER Map",
          icon: <ConsoleSqlOutlined />,
        },
      ]}
    />
  );
}
