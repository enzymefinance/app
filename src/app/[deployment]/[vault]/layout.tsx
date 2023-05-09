const isSubgraph = false

export default function Layout(props: {
  children: React.ReactNode;
  onChain: React.ReactNode;
  subgraph: React.ReactNode;
}) {

  if (isSubgraph) {
    return props.subgraph
  }

  return props.onChain
}
