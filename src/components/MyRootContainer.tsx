import { useMyState } from "@/valtio/state";
import { ConfigProvider } from "antd";
import { ReactNode } from "react";
import { MyLoading } from "./MyLoading";

export default function MyRootContainer(props: { children: ReactNode }) {
  const { snap } = useMyState();

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0,
        },
        components: {
          Menu: {
            collapsedIconSize: 22,
            // itemMarginBlock: 10,
            // itemMarginInline: 0,
          },
          Card: {
            headerHeight: 45,
          },
        },
      }}
    >
      <MyLoading />
      {props.children}
    </ConfigProvider>
  );
}
