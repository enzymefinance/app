import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TokenHoldingsTable(portfolio: any) {
  return (
    <div className="w-full">
      <h1 className="my-4 text-lg">Token Holdings</h1>
      {portfolio.length > 0 ? (
        <Table>
          <TableCaption>A list of your current Portfolio assets!</TableCaption>
          <TableHeader className="w-full">
            <TableRow>
              <TableHead className="w-[100px]">Asset</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio.map((row: any) => (
              <TableRow>
                <TableCell className="font-medium">{row.asset}</TableCell>
                <TableCell>{row.balance}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell className="text-right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
}
