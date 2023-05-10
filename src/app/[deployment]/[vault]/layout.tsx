import type { ReactNode } from "react";

const isSubgraph = false;

export default function Layout(props: {
  children: ReactNode;
  onchain: ReactNode;
  subgraph: ReactNode;
}) {
  if (isSubgraph) {
    return props.subgraph;
  }

  return props.onchain;
}
