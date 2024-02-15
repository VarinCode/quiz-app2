/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_PORT: number;
    readonly VITE_BACKEND_PORT2: number;
    readonly VITE_HOST: string;
    readonly VITE_API_ENDPOINT: string;
    readonly VITE_API_ENTPOINT_SCORE: string;
    readonly VITE_API_ENTPOINT_QUIZ: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}