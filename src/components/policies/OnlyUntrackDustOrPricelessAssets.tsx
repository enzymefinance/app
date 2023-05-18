import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { asSyncComponent } from "@/lib/next";

export const OnlyUntrackDustOrPricelessAssets = asSyncComponent(async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Only Untrack Dust Or Priceless Assets</CardTitle>
      </CardHeader>
      <CardContent />
    </Card>
  );
});
