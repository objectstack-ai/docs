import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function registerDevCommand(cli) {
  cli
    .command('dev [dir]', 'Start development server')
    .option('--port <port>', 'Port to listen on', { default: 3000 })
    .action(async (dir, options) => {
      // 1. Resolve user's docs directory (Absolute path)
      const docsDir = dir ? path.resolve(process.cwd(), dir) : path.resolve(process.cwd(), 'content/docs');
      
      // 2. Resolve the Next.js App directory (Inside the package now)
      // packages/objectdocs/src/commands/dev.mjs -> ../../site
      const nextAppDir = path.resolve(__dirname, '../../site');

      console.log(`Starting docs server...`);
      console.log(`  Engine: ${nextAppDir}`);
      console.log(`  Content: ${docsDir}`);
      
      const env = {
        ...process.env,
        DOCS_DIR: docsDir,
        PORT: options.port
      };
      
      const nextCmd = 'next'; // Ideally absolute path to next bin if needed, but relative usually works if deps are installed
      const args = ['dev', '-p', options.port];

      const child = spawn(nextCmd, args, {
        stdio: 'inherit',
        env,
        cwd: nextAppDir // CRITICAL: Run in the Next.js app directory
      });

      child.on('close', (code) => {
        process.exit(code);
      });
    });
}
