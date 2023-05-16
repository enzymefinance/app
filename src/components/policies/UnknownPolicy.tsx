import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { asSyncComponent } from "@/lib/next";

export const UnknownPolicy = asSyncComponent(async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Unknown Policy</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium leading-none">Vault contains unknown policy.</p>
      </CardContent>
    </Card>
  );
});
