import { Header } from '@/components/dashboard/header';
import { auth } from '@/lib/server/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return redirect('/signin');
  }
  return (
    <>
      <Header />
      {children}
      <Toaster />
    </>
  );
}
