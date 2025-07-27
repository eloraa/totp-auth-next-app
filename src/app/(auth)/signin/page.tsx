import { MeshGradient } from '@/components/shaders/mesh-gradient';
import { Metadata } from 'next';
import { Signin } from './signin';

export const metadata: Metadata = {
  title: 'Sign in | Authenticator',
};

export default function SignInPage() {
  return (
    <main className="h-full relative flex items-center justify-center">
      <MeshGradient
        className="fixed inset-0 -z-1 pointer-events-none bg-gradient-to-r from-[#30502f] via-[#327330] to-[#327330]"
        colors={['#93b450', '#30502f', '#30502f', '#327330']}
        distortion={0.35}
        swirl={0.1}
        speed={1}
        quality={0.1}
      />

      <Signin />
    </main>
  );
}
