import { useMyState } from "@/valtio/state";
import { GiteeMarkdown } from "./GiteeMarkdown";

export default function DocRender() {
  const { snap } = useMyState();

  return <GiteeMarkdown fileUrl={snap.session.sub} />;
}
