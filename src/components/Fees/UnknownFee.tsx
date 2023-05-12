import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { asSyncComponent } from "@/lib/next";

export const UnknownFee = asSyncComponent(async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Unknown Fee</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium leading-none">Vault contains unknown fees.</p>
      </CardContent>
    </Card>
  );
});
