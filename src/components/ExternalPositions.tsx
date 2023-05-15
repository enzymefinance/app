import { BigIntDisplay } from "./BigIntDisplay";
import { Title } from "./Title";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import type { Deployment } from "@/lib/consts";
import type { Asset } from "@/lib/types";
import type { Address } from "viem";

interface PositionAssets {
  asset: Asset;
  amount: bigint;
}

interface ExternalPositionsType {
  externalPosition: Address;
  externalPositionLabel: string;
  debtAssets: PositionAssets[];
  managedAssets: PositionAssets[];
}

export function ExternalPositions({
  externalPositions,
}: {
  deployment: Deployment;
  externalPositions: ExternalPositionsType[];
}) {
  if (externalPositions.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-12">
      <Title size="xl" appearance="primary">
        External Positions
      </Title>
      {externalPositions.map((row) => (
        <div>
          <Title size="lg" appearance="secondary">
            {row.externalPositionLabel}
          </Title>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Debt Assets</TableHead>
                <TableHead className="text-right">Managed Assets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={row.externalPosition}>
                <TableCell className="font-medium">{row.externalPosition}</TableCell>
                <TableCell className="text-right">
                  {row.debtAssets.length > 0
                    ? row.debtAssets.map(({ asset, amount }) => {
                        if (amount > 0) {
                          return (
                            <div key={asset.address} className="border border-1 p-4">
                              <div className="font-medium">
                                {asset.symbol} {asset.name}
                              </div>
                              <BigIntDisplay amount={amount} decimals={asset.decimals} />
                            </div>
                          );
                        }

                        return null;
                      })
                    : null}
                </TableCell>
                <TableCell className="text-right">
                  {row.managedAssets.length > 0
                    ? row.managedAssets.map(({ asset, amount }) => {
                        if (amount > 0) {
                          return (
                            <div key={asset.address} className="border border-1 p-4">
                              <div className="font-medium">
                                {asset.symbol} {asset.name}
                              </div>
                              <BigIntDisplay amount={amount} decimals={asset.decimals} />
                            </div>
                          );
                        }

                        return null;
                      })
                    : null}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}
