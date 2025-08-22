'use client';

import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { GoogleSignin } from '@/components/ui/google-signin';
import { authClient } from '@/lib/client/auth/auth';

const signInSchema = z.object({
  email: z.email({
    message: 'Please enter a valid email',
  }),
});

export const Signin = () => {
  const [isEmail, setIsEmail] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
    },
  });
  const email = form.watch('email');
  const sendMagicLink = async (values: z.infer<typeof signInSchema>) => {
    const { email } = values;
    try {
      setLoading(true);
      const { data, error } = await authClient.signIn.magicLink({
        email,
        callbackURL: '/signin',

      });

      if (error) {
        toast.error(error.message || 'Failed to send magic link');
        return;
      }

      if (data) {
        setIsSend(true);
        toast.success('Magic link sent! Check your email.');
      }
    } catch (error) {
      console.error('Magic link error:', error);
      toast.error('Failed to send magic link');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (window.opener) {
      window.close();
    }
  }, []);
  return (
    <div className={cn('rounded-lg border border-transparent p-4 transition-colors w-full md:max-w-xs', isSend && 'border-foreground/15')}>
      <div className="flex gap-8 overflow-hidden p-2">
        <div
          className={cn('w-full min-w-full space-y-2 pt-2 transition-transform', isEmail && '-translate-x-full')}
          ref={el => {
            if (!el) return;

            el.addEventListener('transitionend', () => {
              if (isEmail) el.classList.add('hidden');
              else el.classList.remove('hidden');
            });
          }}
        >
          <div className="text-center text-white text-sm">
            <h1>Sign in to continue</h1>
          </div>
          <GoogleSignin className="shadow-none rounded-full h-11 bg-secondary/20 hover:bg-secondary/30 cursor-pointer border border-secondary/15 text-white" />
          <Button
            size="lg"
            variant="ghost"
            onClick={() => setIsEmail(true)}
            className="flex items-center gap-2 cursor-pointer text-white hover:text-white/90 hover:!bg-transparent border-b h-auto rounded-none !px-0 border-b-white/15 mx-auto"
          >
            <Mail className="size-5" />
            Continue with Email
          </Button>
        </div>

        <div
          className={cn('w-full min-w-full pt-2 transition-transform', !isEmail && 'translate-x-full')}
          ref={el => {
            if (!el) return;

            el.addEventListener('transitionend', () => {
              if (!isEmail) el.classList.add('hidden');
              else el.classList.remove('hidden');
            });
          }}
        >
          {isSend ? (
            <div className="flex h-full w-full items-center justify-center overflow-hidden">
              <div className="flex h-full w-full items-center justify-center rounded-lg px-6 py-4">
                <div>
                  <figure className="mx-auto h-10 w-10">
                    <svg viewBox="0 0 71 49" fill="none">
                      <path
                        d="M30.3283 1.86112C39.0743 1.27912 47.8173 0.717123 56.6053 1.00412C60.2843 1.12412 63.4503 3.10111 67.0793 3.33011C68.6363 3.42811 68.7433 4.93308 68.8893 6.30808C69.7243 14.1611 68.7354 22.0011 68.8274 29.8441C68.8894 35.1581 67.5243 40.5381 70.0893 45.7571C71.1903 47.9961 68.4904 48.3521 67.3404 48.3121C47.3644 47.6251 27.3863 48.3501 7.41134 48.1941C2.07034 48.1521 -0.122678 47.3971 0.271322 39.8571C0.742322 30.8461 1.03035 21.8261 1.40035 12.8101C1.46935 11.1361 1.60734 9.46407 1.61434 7.79007C1.62534 4.81707 3.13531 3.33007 6.01931 2.93607C12.2943 2.07707 18.5843 1.60512 24.9213 1.84012C26.7213 1.90612 28.5263 1.85712 30.3283 1.86112ZM24.4373 4.62809C19.6783 4.96109 14.9243 5.3841 10.1603 5.5961C7.2053 5.7281 7.0483 7.42708 7.7593 9.51908C8.1183 10.5741 8.96531 11.4901 9.69131 12.3881C16.6373 20.9801 25.6343 26.8491 35.3953 31.7031C36.8343 32.4191 37.8413 31.8001 38.8263 30.8301C45.6103 24.1471 53.3163 18.4251 59.4433 11.0581C60.7273 9.51408 63.5193 7.92909 62.6953 6.29209C61.7713 4.45609 58.6513 4.34909 56.3963 4.28409C45.7433 3.97809 35.0933 4.36609 24.4373 4.62809ZM65.9073 9.81107C65.5653 9.56007 65.2223 9.30908 64.8803 9.05808C64.6413 9.65708 64.5443 10.3831 64.1413 10.8371C57.1233 18.7431 49.7413 26.2661 40.9543 32.2541C39.3923 33.3191 38.6913 34.6391 39.0913 36.5141C39.2783 37.3911 39.3683 38.2271 39.0663 39.1591C37.5923 43.7111 38.1603 44.6711 42.9483 44.7581C49.1303 44.8711 55.3013 43.8021 61.4943 44.3241C64.4323 44.5711 65.3314 43.4121 65.1034 40.5291C64.6864 35.2731 64.0403 30.0271 64.7063 24.7091C65.3243 19.7691 65.5233 14.7781 65.9073 9.81107ZM18.5673 44.3721C18.5673 44.3271 18.5673 44.2811 18.5673 44.2361C22.3123 44.2451 26.0574 44.3031 29.8014 44.2431C31.9724 44.2081 34.6863 44.3581 31.7183 41.0691C30.9273 40.1931 30.4213 38.8471 30.8153 37.8081C32.3733 33.7021 30.2913 32.0871 26.7683 31.0141C25.4603 30.6161 24.3393 29.5741 23.1613 28.7851C17.8143 25.2061 12.5523 21.5281 8.36434 16.5361C7.83134 15.9011 7.25833 14.8881 6.19533 15.2311C5.30233 15.5191 5.48734 16.5501 5.45034 17.2401C5.00634 25.4811 4.61533 33.7251 4.23433 41.9691C4.13133 44.1931 5.63131 44.3701 7.33431 44.3581C11.0783 44.3301 14.8233 44.3641 18.5673 44.3721Z"
                        fill="currentColor"
                      />
                    </svg>
                  </figure>
                  <h1 className="mx-auto max-w-40 text-sm text-center">We&apos;ve sent a magic link to your email</h1>

                  <div className="pt-6">
                    <div className="group flex items-center gap-2 rounded-md bg-tertiary px-2 py-1 pl-3 font-mono text-sm text-tertiary-foreground">
                      <p className="text-current transition-colors group-hover:text-white">{email}</p>
                      <div className="__undo_button_xfec3e flex w-0 items-center justify-start overflow-hidden transition-[width] max-md:w-auto group-hover:md:w-8">
                        <Button
                          onClick={() => {
                            setIsSend(false);
                            setLoading(false);
                          }}
                          variant="link"
                          size="sm"
                          className="h-auto w-auto rounded-none border-b border-current p-0 text-current"
                        >
                          Undo
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-center pb-2">
                <Button variant="link" className="gap-2 text-white" onClick={() => setIsEmail(false)}>
                  <ArrowLeft className="h-4 w-4" /> Go Back
                </Button>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(sendMagicLink)} className="space-y-2">
                  <div className="w-full md:mx-auto md:max-w-64">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" className="w-full bg-popover/20 border-none text-white placeholder:text-white shadow-none border-0 h-10" type="text" {...field} />
                          </FormControl>
                          <FormMessage className="text-destructive/60 font-normal" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="relative overflow-hidden p-1">
                    <div className={cn('absolute inset-0 z-10 flex -translate-y-full items-center justify-center transition-transform', loading && 'translate-y-0')}>
                      <Spinner className="h-6 w-6" />
                    </div>
                    <Button className={cn('mx-auto flex w-full max-w-32 items-center justify-between gap-2 cursor-pointer', loading && 'translate-y-[calc(100%+8px)]')}>
                      Sign In
                      <div className="h-4 w-4">
                        <ArrowRight />
                      </div>
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="pt-4">
                <p className="flex items-center justify-center gap-2 text-xs text-white/60">
                  <span className="h-4 w-4">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                      <path
                        d="m19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  We&apos;ll send you a magic link to sign in
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
