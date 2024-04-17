import { useMyState } from "@/valtio/state";
import ApiRender from "./ApiRender";
import DBRender from "./DBRender";
import DocRender from "./DocRender";
import EnumRender from "./EnumRender";

export default function RightContent() {
  const { snap } = useMyState();

  if (!snap.session.sub) {
    return <div>404</div>;
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
    default:
      return <div>404</div>;
  }
}
