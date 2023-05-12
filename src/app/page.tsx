import { VaultList } from "@/components/VaultList";
import { VaultSearch } from "@/components/VaultSearch";

export default function RootPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 container mx-auto">
      <VaultList />
      <VaultSearch />
    </main>
  );
}
