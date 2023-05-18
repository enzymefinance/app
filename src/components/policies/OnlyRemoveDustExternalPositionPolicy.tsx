import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { asSyncComponent } from "@/lib/next";

export const OnlyRemoveDustExternalPositionPolicy = asSyncComponent(async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Only Remove Dust External Position Policy</CardTitle>
      </CardHeader>
      <CardContent />
    </Card>
  );
});
