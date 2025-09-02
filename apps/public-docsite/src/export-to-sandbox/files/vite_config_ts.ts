import { FileDefinitionFactory } from "./file-definiton-factory";

export const viteConfigTs: FileDefinitionFactory = () => ({
    fileName: "vite.config.ts",
    content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
})
`,
});
