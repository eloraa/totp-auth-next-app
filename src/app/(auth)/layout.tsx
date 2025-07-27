import { Header } from '@/components/auth/header';
import { auth } from '@/lib/server/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    return redirect('/');
  }
  return (
    <>
      <Header className="text-white" />
      {children}
    </>
  );
}
