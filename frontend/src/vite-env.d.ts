/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_PORT: number;
    readonly VITE_API_URL: string;
    readonly VITE_API_ENDPOINT: string;
    readonly VITE_API_ENTPOINT_SCORE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}