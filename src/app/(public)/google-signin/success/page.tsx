'use client';

import * as React from 'react';
import { redirect } from 'next/navigation';
import { useSession } from '@/lib/client/auth/auth';
import { Spinner } from '@/components/ui/spinner';

export default function GooglLogin() {
  const session = useSession();
  React.useEffect(() => {
    console.log(window.opener);

    if (session.data?.user && window.opener && window.opener !== window) {
      const openerWindow = window.opener as Window & {
        onLoginSuccess?: () => void;
        onLoginError?: () => void;
      };
      if (openerWindow.onLoginSuccess) {
        openerWindow.onLoginSuccess();
      }
      window.close();
    }
    if (session.data?.user && !window.opener) {
      redirect('/signin');
    }
  }, [session]);

  return (
    <div className="flex items-center justify-center fixed inset-0">
      <div className="text-center flex flex-col justify-center items-center">
        <Spinner className="size-8" />
        <p className="text-center mt-4">Success</p>
      </div>
    </div>
  );
}
