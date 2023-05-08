import { Address } from "viem";

export function HelloWorld({ address }: { address: Address }) {
  return <div>Hello {address}!</div>;
}
