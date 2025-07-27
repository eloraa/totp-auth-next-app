import Loading from '@/app/loading';
import { auth } from '@/lib/server/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function GooglLogin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect('/');
  }

  if (!session) {
    const res = await auth.api.signInSocial({ headers: await headers(), body: { provider: 'google', callbackURL: '/google-signin/success' } });

    if (res.redirect && res.url) return redirect(res.url);
  }
  return <Loading />;
}
