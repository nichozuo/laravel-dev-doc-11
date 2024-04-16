import Logo from "@/assets/logo.svg";
import LeftMenu from "@/components/LeftMenu";
import LeftTree from "@/components/LeftTree";
import RightContent from "@/components/RightContent";
import { stateActions } from "@/valtio/actions";
import { useMyState } from "@/valtio/state";
import { Card, Flex, Layout } from "antd";
import { useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useSearchParams } from "umi";

const { Sider, Content } = Layout;

const layoutStyle = {
  overflow: "hidden",
  width: "100vw",
  height: "100vh",
  gap: "3px",
};

export default function HomePage() {
  const { snap } = useMyState();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    stateActions.setMain(searchParams.get("main") || "api");
    stateActions.setSub(searchParams.get("sub") || undefined);
  }, [searchParams]);

  return (
    <Layout style={layoutStyle}>
      <Sider collapsed={true} theme="light">
        <Flex justify="center" align="center" vertical>
          <img src={Logo} width={40} height={40} style={{ margin: "15px 0" }} />
        </Flex>
        <LeftMenu />
      </Sider>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={20}>
          <Card
            title={snap.session.main?.toUpperCase() ?? "-"}
            style={{ height: "100vh" }}
            styles={{
              body: {
                height: "100%",
                overflow: "auto",
                padding: "10px",
              },
            }}
          >
            <LeftTree />
          </Card>
        </Panel>
        <PanelResizeHandle style={{ width: "3px" }} />
        <Panel>
          <Card
            title={snap.session.sub ?? "-"}
            style={{ height: "100vh" }}
            styles={{
              body: {
                height: "100%",
                overflow: "auto",
                padding: "20px",
              },
            }}
          >
            <RightContent />
          </Card>
        </Panel>
      </PanelGroup>
    </Layout>
  );
}
