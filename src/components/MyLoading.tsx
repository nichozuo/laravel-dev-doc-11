import { useMyState } from "@/valtio/state";
import { Spin } from "antd";

export function MyLoading() {
  const { snap } = useMyState();
  if (snap.session.loading === 0) return null;

  return (
    <div
      style={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "100vw",
        height: "100vh",
        position: "fixed",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 1)",
      }}
    >
      <Spin size="large">
        <div style={{ paddingTop: "70px" }} />
        Loading...
      </Spin>
    </div>
  );
}
