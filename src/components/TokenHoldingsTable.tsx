import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AssetWithAmount } from "@/lib/types";
import { BigIntDisplay } from "./BigIntDisplay";

export function TokenHoldingsTable({ portfolioAssets }: {portfolioAssets: AssetWithAmount[] }) {
  return (
    <div className="w-full">
      <h1 className="my-4 text-lg">Token Holdings</h1>
      {portfolioAssets.length > 0 ? (
      <Table>
        <TableCaption>A list of your current Portfolio assets!</TableCaption>
        <TableHeader className="w-full">
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portfolioAssets.map((asset: any) => (
            <TableRow key={asset.symbol}>
              <TableCell className="font-medium">
                {asset.symbol} {asset.name}
              </TableCell>
              <TableCell className="text-right">
                <BigIntDisplay asset={asset} />
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
}
