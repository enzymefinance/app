import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { asSyncComponent } from "@/lib/next";

export const MinSharesSupplyFee = asSyncComponent(async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Min Shares Supply Fee</CardTitle>
      </CardHeader>
      <CardContent />
    </Card>
  );
});
