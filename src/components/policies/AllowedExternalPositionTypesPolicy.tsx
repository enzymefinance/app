import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { asSyncComponent } from "@/lib/next";

export const AllowedExternalPositionTypesPolicy = asSyncComponent(async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Allowed External Position Types Policy</CardTitle>
      </CardHeader>
      <CardContent />
    </Card>
  );
});
