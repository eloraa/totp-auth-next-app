import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 | Authenticator',
};

export default function NotFound() {
  return (
    <main className="h-full bg-[#e5002d] text-white py-20 md:px-20">
      <div className="text-8xl font-light">:(</div>

      <div className="my-10 text-xl font-light space-y-2 max-w-2xl leading-10">
        <p>The page you&apos;re looking for is not found, which means it might have been moved, deleted, or the URL was entered incorrectly.</p>
      </div>

      <div className="font-light mb-20 text-xl">404 Not found</div>

      <div className="font-light">
        <p>
          For more information about this issue, visit{' '}
          <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status" className="text-[#55ff52]">
            https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
          </a>
        </p>
      </div>
    </main>
  );
}
