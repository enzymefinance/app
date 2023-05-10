import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Address, formatUnits } from "viem";

interface PortfolioAssets {
  asset: {
    name: string,
    symbol: string,
    decimals: bigint,
    address: Address
  },
  balance: bigint,
}

export function TokenHoldingsTable(portfolioAssets: PortfolioAssets[]) {
  return (
    <div className="w-full">
      <h1 className="my-4 text-lg">Token Holdings</h1>
      {portfolioAssets.length > 0 ? (
      <Table>
        <TableCaption>A list of your current Portfolio assets!</TableCaption>
        <TableHeader className="w-full">
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead className="text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portfolioAssets.map((row: any) => (
            <TableRow key={row.asset.symbol}>
              <TableCell className="font-medium">
                {row.asset.symbol} {row.asset.name}
              </TableCell>
              <TableCell className="text-right">{formatUnits(row.balance, Number(row.asset.decimals))}</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
}
