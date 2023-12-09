# 💭 Thoughtsy

Simple React SPA social web app that allows users to share their words of wisdom with others.\
Created with React 18, React Router 6.4, React Hook Form 7.4 and Material UI 5.\
Testing environment includes Vitest + React Testing Library (TODO: E2E tests with Playwright).\
Supabase is used as back-end.

## 📙 Features

- 🔒 User authentication and sign up
- 🔔 Notifications (snackbars) on user actions
- 📝 Post CRUD operations
- 👍 Post liking feature

## 🔨 Instalation and configuration

1. Clone the repo
2. Install Docker Desktop for Supabase CLI
3. Install the supabase cli (this needs to be done manually to get the cli bin)

```bash
npm install supabase --saves-dev
```

4. Start Supabase (make sure Docker is running), use `npx supabase stop` to end it

```bash
npx supabase start --debug
```

5. Check tests with:

```bash
npm run test
```

6. Start dev server:

```bash
npm run dev
```

You can access local Supabase environment on `http://localhost:54323/`

## 🚀 Deploy

1. Configure .env. file according to .env-example (you need to pass the URL and api-key)
2. Run `npm run build` to build and then drop /dist into Netlify bucket

## 🙏 Useful documentations

### [React Router Docs](https://reactrouter.com/en/main/start/tutorial)

### [Material UI](https://mui.com/material-ui/getting-started/learn/)

### [React Hook Form](https://react-hook-form.com/get-started#Quickstart)

### [React Testing Library](https://testing-library.com/docs/queries/about)

### [React Testing Guide - Aria roles cheatsheet](https://components.guide/react+typescript/testing)

### [Supabase local dev](https://supabase.com/docs/guides/cli/local-development)
