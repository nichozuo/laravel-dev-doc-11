import { useMyState } from "@/valtio/state";
import ApiRender from "./ApiRender";
import DBRender from "./DBRender";
import DocRender from "./DocRender";
import ERRender from "./ERRender";
import EmptyRender from "./EmptyRender";
import EnumRender from "./EnumRender";

export default function RightContent() {
  const { snap } = useMyState();

  if (!snap.session.sub) {
    return <EmptyRender />;
  }

  switch (snap.session.main) {
    case "api":
      return <ApiRender />;
    case "db":
      return <DBRender />;
    case "enum":
      return <EnumRender />;
    case "doc":
      return <DocRender />;
    case "er":
      return <ERRender />;
    default:
      return <EmptyRender />;
  }
}
