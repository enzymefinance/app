import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { asSyncComponent } from "@/lib/next";

export const MinAssetBalancesPostRedemptionPolicy = asSyncComponent(async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Specific Asset Redemption Threshold</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-sm font-medium leading-none">
          TODO
        </p>
      </CardContent>
    </Card>
  );
});
