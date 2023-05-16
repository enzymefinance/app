import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { asSyncComponent } from "@/lib/next";

export const OnlyUntrackDustOrPricelessAssets = asSyncComponent(async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Restrict Asset Position Removal</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium leading-none">
          This policy eliminates the potential for a vault manager to manipulate their vault’s share price by
          undercounting the assets it holds.
        </p>
      </CardContent>
    </Card>
  );
});
