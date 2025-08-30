import { betterAuth } from 'better-auth';
import { APIError } from 'better-auth/api';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { db } from '../db';
import { oneTap, magicLink, createAuthMiddleware } from 'better-auth/plugins';
import { sendMagicLinkEmail } from './lib';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: false,
    disableSignUp: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      disableSignUp: true,
      disableImplicitSignUp: true,
      disableIdTokenSignIn: true,
    },
  },
  hooks: {
    before: createAuthMiddleware(async ctx => {
      if (ctx.path.startsWith('/sign-up')) {
        throw new APIError('BAD_REQUEST', {
          message: 'Endpoint not allowed',
        });
      }
      
      if (ctx.path === '/error' && ctx.query?.error === 'signup_disabled') {
        return new Response(null, {
          status: 302,
          headers: {
            Location: '/auth/error?code=signup_disabled',
          },
        });
      }
    }),
  },

  trustedOrigins: process.env.TRUSTED_ORIGINS ? process.env.TRUSTED_ORIGINS.split(',') : [],

  plugins: [
    nextCookies(),
    oneTap(),
    magicLink({
      sendMagicLink: sendMagicLinkEmail,
      expiresIn: 60 * 15,
      disableSignUp: true,
    }),
  ],
});
