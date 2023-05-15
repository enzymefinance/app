import { PageLayout } from "@/components/PageLayout";
import { VaultList } from "@/components/VaultList";
import { VaultSearch } from "@/components/VaultSearch";

export default function RootPage() {
  return (
    <main>
      <PageLayout className="flex flex-col items-center p-24">
        <VaultList />
        <VaultSearch />
      </PageLayout>
    </main>
  );
}
