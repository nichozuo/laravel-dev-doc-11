import { useMyState } from "@/valtio/state";
import { useEffect, useState } from "react";

export default function ERRender() {
  const { snap } = useMyState();
  const [url, setUrl] = useState<string>();

  const baseUrl = snap.session.openapi["map"].server;

  useEffect(() => {
    // console.log(snap.session.main, snap.session.sub);
    if (!snap.session.main || !snap.session.sub) return;
    if (snap.session.main !== "er") return;
    setUrl(baseUrl + snap.session.sub);
    // 请求接口
  }, [snap.session.main, snap.session.sub]);

  return <img src={url} />;
}
