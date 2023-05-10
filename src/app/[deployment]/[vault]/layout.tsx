import type { ReactNode } from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { assertParams } from "@/lib/params";
import { z } from "@/lib/zod";
import { networks } from "@/lib/consts";
import { getVaultName } from "@/lib/rpc/getVaultName";
import { handleContractError } from "@/lib/errors";
import { Card } from "@/components/ui/card";
import Link from "next/link";

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
    <div>
      <Card>
        {name}
        {vault}
      </Card>
      <Tabs defaultValue="overview" className="w-[400px]">
        <TabsList>
          <Link href={`${deployment}/${vault}`}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </Link>
          <Link href={`${deployment}/${vault}/portfolio`}>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </Link>
          <Link href={`${deployment}/${vault}/configuration`}>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          </Link>
        </TabsList>
        <TabsContent value="overview">{props.children}</TabsContent>
        <TabsContent value="portfolio">{props.portfolio}</TabsContent>
        <TabsContent value="configuration">{props.configuration}</TabsContent>
      </Tabs>
    </div>
  );
}
