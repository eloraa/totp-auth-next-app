import { CodeProvider } from '@/lib/client/data/provider';
import { Codes } from './codes';

export default function DashboardPage() {
  return (
    <main className="pt-20 px-2 md:px-4 h-full">
      <CodeProvider>
        <Codes />
      </CodeProvider>
    </main>
  );
}
