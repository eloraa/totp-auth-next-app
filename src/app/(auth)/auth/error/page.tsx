import { MeshGradient } from '@/components/shaders/mesh-gradient';
import { type Metadata } from 'next';
import { ErrorContent } from './error-content';

export const metadata: Metadata = {
  title: 'Authentication Error | Authenticator',
};

export default function ErrorPage() {
  return (
    <main className="h-full relative flex items-center justify-center">
      <MeshGradient
        className="fixed inset-0 -z-1 pointer-events-none bg-gradient-to-r from-[#502f2f] via-[#F44336] to-[#733030]"
        colors={['#F44336', '#502f2f', '#502f2f', '#733030']}
        distortion={0.35}
        swirl={0.1}
        speed={1}
        quality={0.1}
      />

      <ErrorContent />
    </main>
  );
}