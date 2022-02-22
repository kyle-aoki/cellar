import { ReactNode } from "react";
import { SplitView } from "./styled";

export default function SplitViewComponent({
  children,
}: {
  children: ReactNode;
}) {
  return <SplitView.Container>{children}</SplitView.Container>;
}
