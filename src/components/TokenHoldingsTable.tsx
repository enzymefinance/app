import { BigIntDisplay } from "./BigIntDisplay";
import { Title } from "./Title";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AssetWithAmount } from "@/lib/types";

export function TokenHoldingsTable({ portfolioAssets }: { portfolioAssets: AssetWithAmount[] }) {
  return (
    <div className="w-full mt-12">
      <Title size="xl" appearance="primary">
        Token Holdings
      </Title>
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
            {portfolioAssets.map((asset) => (
              <TableRow key={asset.symbol}>
                <TableCell className="font-medium">
                  {asset.symbol} {asset.name}
                </TableCell>
                <TableCell className="text-right">
                  <BigIntDisplay amount={asset.amount} decimals={asset.decimals} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
}
