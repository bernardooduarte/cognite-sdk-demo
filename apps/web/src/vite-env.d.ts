/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_PYTHON_URL: string
  readonly VITE_API_JS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
