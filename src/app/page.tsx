import { Gradient } from './gradient';
import { Header } from '@/components/homepage/header';
import { AndroidIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { GlobeIcon } from 'lucide-react';
import { LogoIcon } from '@/components/ui/logo';
import { getTheme } from '@/lib/server/theme';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Home() {
  const { theme } = getTheme({ cookies: await cookies() });
  return (
    <main className="h-full overflow-hidden flex items-center justify-center w-full">
      <Gradient theme={theme} />
      <Header />
      <div className="space-y-4 w-full px-2 md:px-4 flex flex-col items-center">
        <figure className="mx-auto flex items-center justify-center">
          {/* <Image src="/logo.png" alt="Authenticator" width={50} height={50} /> */}
          <LogoIcon width={50} height={50} />
          <figcaption className="sr-only">Authenticator</figcaption>
        </figure>

        <div className="flex items-center gap-4 max-md:flex-col mt-12 mx-auto">
          <Button className="rounded-none max-md:w-full justify-start bg-[#34A853] hover:bg-[#34A853]/80 dark:bg-[#1E93FF] dark:hover:bg-[#1E93FF]/80 text-black cursor-not-allowed">
            <AndroidIcon />
            Download for Android
          </Button>
          <Button className="rounded-none max-md:w-full justify-start" asChild>
            <Link href="/dashboard">
              <GlobeIcon />
              Open in browser
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
