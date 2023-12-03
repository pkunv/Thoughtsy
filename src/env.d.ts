/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_KEY: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_TEST_EMAIL: string
  readonly VITE_SUPABASE_TEST_PASSWORD: string
  readonly VITE_TEST_SIGN_UP: 0 | 1
  readonly VITE_SUPABASE_SIGNUP_EMAIL: string
  readonly VITE_SUPABASE_SIGNUP_DISPLAY_NAME: string
  readonly VITE_SUPABASE_SIGNUP_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
