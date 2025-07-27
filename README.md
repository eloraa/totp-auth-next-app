# Next.js + better-auth + drizzle + shadcn/ui Boilerplate

[Next.js](https://nextjs.org) boilerplate featuring:

- [better-auth](https://www.better-auth.com/docs/) for authentication
- [drizzle](https://orm.drizzle.team/docs/get-started) as the ORM
- [shadcn/ui](https://ui.shadcn.com/docs/installation/next) for UI components

---

## Getting Started

1. **Clone the repo:**

   ```bash
   git clone https://github.com/eloraa/next-drizzle-bauth-cn.git
   cd next-drizzle-bauth-cn
   ```

2. **Install dependencies:**

   ```bash
   pnpm install # or yarn install, npm install, bun install
   ```

3. **Configure your environment:**

   Create a `.env` file in the root with the following variables:

   ```env
   DATABASE_URL=postgres://elora:123456@localhost:5432/db?sslmode=disable
   BETTER_AUTH_SECRET=very-secret-key
   BETTER_AUTH_URL=http://localhost:3000
   ```
   > Replace values as needed for your setup.

4. **Run the development server:**

   ```bash
   pnpm dev # or yarn dev, npm run dev, bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Stack & Features

- **Next.js App Router**
- **better-auth** for authentication
- **drizzle** ORM for Postgres
- **shadcn/ui** for beautiful, accessible UI

---

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [better-auth Docs](https://www.better-auth.com/docs/)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/get-started)
- [shadcn/ui Docs](https://ui.shadcn.com/docs/installation/next)

---

## License

MIT
