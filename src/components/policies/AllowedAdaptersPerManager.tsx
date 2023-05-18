import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { asSyncComponent } from "@/lib/next";

export const AllowedAdaptersPerManager = asSyncComponent(async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Allowed Adapters Per Manager</CardTitle>
      </CardHeader>
      <CardContent />
    </Card>
  );
});
