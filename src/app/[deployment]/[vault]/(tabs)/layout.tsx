import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { handleContractError } from "@/lib/errors";
import { assertParams } from "@/lib/params";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { z } from "@/lib/zod";
import { getVaultName } from "@enzymefinance/sdk";
import Link from "next/link";
import type { ReactNode } from "react";

export default async function VaultLayout(props: {
  children: ReactNode;
  overview: ReactNode;
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

  const client = getPublicClientForDeployment(deployment);
  const name = await getVaultName(client, { vault }).catch(handleContractError());

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <Title appearance="primary" size="xl">
            {name}
          </Title>
          <p className="break-words">{vault}</p>
        </div>
        <div>
          <Button className="mt-4">
            <Link href={`${deployment}/${vault}/deposit`}>Deposit</Link>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="mb-4">
        <TabsList className="grid grid-rows-1 grid-cols-3 space-x-2 px-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>
        <div>
          <TabsContent value="overview">{props.overview}</TabsContent>
          <TabsContent value="portfolio">{props.portfolio}</TabsContent>
          <TabsContent value="configuration">{props.configuration}</TabsContent>
        </div>
      </Tabs>
    </PageLayout>
  );
}
