import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assertParams } from "@/lib/params";
import { z } from "@/lib/zod";
import { networks } from "@/lib/consts";
import { getVaultName } from "@/lib/rpc/getVaultName";
import { handleContractError } from "@/lib/errors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function VaultLayout(props: {
  children: ReactNode;
  configuration: ReactNode;
  portfolio: ReactNode;
  params: { deployment: string; vault: string };
}) {
  const { vault, deployment } = assertParams({
    params: props.params,
    schema: z.object({
      deployment: z.deployment(),
      vault: z.address(),
    }),
  });

  const network = networks[deployment];

  const [name] = await Promise.all([getVaultName({ vault, network })]).catch(handleContractError());

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>{vault}</CardContent>
      </Card>
      <Tabs defaultValue="overview" className="mb-4">
        <TabsList className="grid grid-rows-1 grid-cols-3 space-x-2 px-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>
        <div>
          <TabsContent value="overview">{props.children}</TabsContent>
          <TabsContent value="portfolio">{props.portfolio}</TabsContent>
          <TabsContent value="configuration">{props.configuration}</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
