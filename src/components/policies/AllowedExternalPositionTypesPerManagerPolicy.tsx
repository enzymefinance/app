import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { asSyncComponent } from "@/lib/next";

export const AllowedExternalPositionTypesPerManagerPolicy = asSyncComponent(async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Allowed External Position Types Per Manager Policy</CardTitle>
      </CardHeader>
      <CardContent />
    </Card>
  );
});
