import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { asSyncComponent } from "@/lib/next";

export const MinAssetBalancesPostRedemptionPolicy = asSyncComponent(async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Min Asset Balances Post Redemption Policy</CardTitle>
      </CardHeader>
      <CardContent />
    </Card>
  );
});
