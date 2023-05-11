import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VaultTileProps {
  title: string;
  description: string;
}

export function VaultTile({ title, description }: VaultTileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-align">
        <div>{description}</div>
      </CardContent>
    </Card>
  );
}
