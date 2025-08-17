import * as React from 'react';
import { Spinner } from '@/components/ui/spinner';
import { auth } from '@/lib/server/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SignoutPage() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect('/signin');
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-brand-magenta-primary text-affirmative-primary-foreground">
      <div className="text-center flex flex-col justify-center items-center">
        <Spinner className="size-8" />
        <p className="text-center mt-4">Signing out...</p>
      </div>
    </div>
  );
}
