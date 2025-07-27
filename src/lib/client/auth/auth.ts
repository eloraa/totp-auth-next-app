import { oneTapClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
export const authClient = createAuthClient({
  plugins: [
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      autoSelect: false,
      cancelOnTapOutside: true,
      context: 'signin',
      additionalOptions: {
        itp_support: true,
        use_fedcm_for_prompt: true,
      },
      promptOptions: {
        baseDelay: 1000,
        maxAttempts: 1,
      },
    }),
  ],
});

export const { signIn, signUp, useSession } = createAuthClient();
