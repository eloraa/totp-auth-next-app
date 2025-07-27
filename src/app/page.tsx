export default function Home() {
  return (
    <div className="p-2 md:p-6">
      <style>
        {`
          .gradient {
            background-image: linear-gradient(to right, #ff8719 0%,#4651ff 20.13%,#93c0ff 41.517%,#d4db00 61.635%,#ffe87a 81.138%,#ff8719 100%);
          }
           
          .gradient-lighter {
            background-image: linear-gradient(to right, #fdba7c 0%,#939bff 20.13%,#93c0ff 41.517%,#fcff9c 61.635%,#ffee9b 81.138%,#fdba7c 100%);
          }
          @keyframes scrollGradient {
            0% {
              background-position: calc(150% + (-5% - 0%)) calc(150% + (-5% - 0%));
            }
            100% {
              background-position: calc(-150% + (-5% - 0%)) calc(-150% + (-5% - 0%));
            }
          }
        `}
      </style>
      <h1>
        <span className="bg-gradient-to-r from-[#ff7bcc] via-[#c7cc30] to-[#fae351]">#e106a</span>
      </h1>
      <p className="mt-4 text-lg">
        Next.js boilerplate with <span className="text-[#1E93FF]">better-auth</span>, <span className="text-[#329c18]">drizzle</span>, and <span className="text-[#FF851B]">shadcn</span>
      </p>
      <div className="mt-6">
        <a href="https://github.com/eloraa/next-drizzle-bauth-cn" target="_blank" className="inline-flex items-center gap-1 font-medium relative group">
          Github repo
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
          <span className="absolute bottom-0 inset-x-0 h-0.5 rounded-full bg-[size:300%_300%] animate-[scrollGradient_45s_linear_infinite] gradient"></span>
        </a>
      </div>
      <div className="mt-16">
        <p className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          Docs
        </p>
      </div>
      <div className="mt-2 flex items-center gap-4 flex-wrap max-md:[&>a]:flex-1/3">
        <a href="https://nextjs.org/docs" target="_blank" className="inline-flex items-center gap-2 py-0.5 pl-1 pr-1.5 bg-[#ec6a8a] relative group">
          <span className="inline-flex items-center gap-2 relative z-1  group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">
            <svg viewBox="0 0 256 222" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" className="size-3.5">
              <path fill="currentColor" d="m128 0 128 221.705H0z" />
            </svg>
            Next.js
          </span>
          <span className="bg-[size:300%_300%] animate-[scrollGradient_45s_linear_infinite] gradient-lighter transition-[opacity,transform] inset-0 size-full absolute group-hover:opacity-100 opacity-0 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
        <a href="https://www.better-auth.com/docs/" target="_blank" className="inline-flex items-center gap-2 py-0.5 pl-1 pr-1.5 bg-[#87D8F1] relative group">
          <span className="inline-flex items-center gap-2 relative z-1  group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">
            <svg width="60" height="45" viewBox="0 0 60 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0H15V15H30V30H15V45H0V30V15V0ZM45 30V15H30V0H45H60V15V30V45H45H30V30H45Z" fill="currentColor"></path>
            </svg>
            Better auth
          </span>
          <span className="bg-[size:300%_300%] animate-[scrollGradient_45s_linear_infinite] gradient-lighter transition-[opacity,transform] inset-0 size-full absolute group-hover:opacity-100 opacity-0 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
        <a href="https://orm.drizzle.team/docs/get-started" target="_blank" className="inline-flex items-center gap-2 py-0.5 pl-1 pr-1.5 bg-[#4FCC30] relative group">
          <span className="inline-flex items-center gap-2 relative z-1  group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 160 160" className="size-5">
              <rect width={9.631} height={40.852} fill="currentColor" rx={4.816} transform="matrix(.87303 .48767 -.49721 .86763 43.48 67.304)" />
              <rect width={9.631} height={40.852} fill="currentColor" rx={4.816} transform="matrix(.87303 .48767 -.49721 .86763 76.94 46.534)" />
              <rect width={9.631} height={40.852} fill="currentColor" rx={4.816} transform="matrix(.87303 .48767 -.49721 .86763 128.424 46.535)" />
              <rect width={9.631} height={40.852} fill="currentColor" rx={4.816} transform="matrix(.87303 .48767 -.49721 .86763 94.957 67.304)" />
            </svg>
            Drizzle
          </span>
          <span className="bg-[size:300%_300%] animate-[scrollGradient_45s_linear_infinite] gradient-lighter transition-[opacity,transform] inset-0 size-full absolute group-hover:opacity-100 opacity-0 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
        <a href="https://ui.shadcn.com/docs/installation/next" target="_blank" className="inline-flex items-center gap-2 py-0.5 pl-1 pr-1.5 bg-[#ef7d63] relative group">
          <span className="inline-flex items-center gap-2 relative z-1  group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="1em" height="1em" className="size-4">
              <path fill="none" d="M0 0h256v256H0z" />
              <path fill="none" stroke="currentColor" strokeWidth={25} strokeLinecap="round" d="M208 128l-80 80M192 40L40 192" />
            </svg>
            shadcn/ui
          </span>
          <span className="bg-[size:300%_300%] animate-[scrollGradient_45s_linear_infinite] gradient-lighter transition-[opacity,transform] inset-0 size-full absolute group-hover:opacity-100 opacity-0 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </div>

      <div className="mt-6">
        <p>
          Update your <span className="bg-[size:300%_300%] animate-[scrollGradient_45s_linear_infinite] gradient-lighter font-mono text-sm font-semibold rounded">.env</span> file
        </p>
        <div className="mt-4">
          <code className="text-sm font-mono overflow-hidden w-full">
            <pre className="overflow-x-auto select-all">
              {`DATABASE_URL=`}
              <span className="text-[#1f6e0b]">
                postgres://elora:<span className="text-[#185409]">123456</span>@localhost:5432/db?sslmode=disable
              </span>
              {`
BETTER_AUTH_SECRET=`}
              <span className="inline-flex items-center gap-0.5 [font:inherit] text-[#b15607]">
                <svg className="size-3" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-72,78.63V184a8,8,0,0,1-16,0V158.63a24,24,0,1,1,16,0ZM160,80H96V56a32,32,0,0,1,64,0Z"></path>
                </svg>
                very-secret-key
              </span>
              {`
BETTER_AUTH_URL=`}
              <span className="inline-flex items-center gap-0.5 [font:inherit] text-[#12589a]">
                <svg className="size-3 ve" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128 20a108 108 0 1 0 108 108A108.12 108.12 0 0 0 128 20Zm83.13 96h-31.57a155.5 155.5 0 0 0-19.51-65.63A84.23 84.23 0 0 1 211.13 116Zm-110.62 24h55c-2.25 26.69-12 51.46-27.49 69.85-15.56-18.39-25.26-43.16-27.51-69.85Zm0-24c2.25-26.69 11.95-51.46 27.49-69.85 15.54 18.39 25.24 43.16 27.49 69.85ZM96 50.37A155.5 155.5 0 0 0 76.44 116H44.87A84.23 84.23 0 0 1 96 50.37ZM44.87 140h31.57A155.5 155.5 0 0 0 96 205.63 84.23 84.23 0 0 1 44.87 140Zm115.18 65.63A155.5 155.5 0 0 0 179.56 140h31.57a84.23 84.23 0 0 1-51.08 65.63Z"></path>
                </svg>
                http://localhost:3000
              </span>
            </pre>
          </code>
        </div>
      </div>
      <div className="fixed bottom-0 inset-x-0 h-6  bg-[size:300%_300%] animate-[scrollGradient_45s_linear_infinite] gradient"></div>
    </div>
  );
}
