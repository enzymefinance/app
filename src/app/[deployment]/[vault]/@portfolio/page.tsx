import { TokenHoldingsTable } from "@/components/TokenHoldingsTable";

const mockPortfolioData = [
  {
    asset: "ETH",
    balance: "1.0000",
    price: "$3,000.00",
    value: "$3,000.00",
  },
  {
    asset: "DAI",
    balance: "1,000.0000",
    price: "$1.00",
    value: "$1,000.00",
  },
];

export default function PortfolioPage() {
  return <>{TokenHoldingsTable(mockPortfolioData)}</>;
}

export const runtime = "edge";
