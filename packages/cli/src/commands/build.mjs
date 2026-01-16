import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function registerBuildCommand(cli) {
  cli
    .command('build [dir]', 'Build static documentation site')
    .action(async (dir, options) => {
      // 1. Resolve user's docs directory
      const docsDir = dir ? path.resolve(process.cwd(), dir) : path.resolve(process.cwd(), 'content/docs');
      
      // 2. Resolve the Next.js App directory (Inside the package now)
      // packages/objectdocs/src/commands/build.mjs -> ../../site
      const nextAppDir = path.resolve(__dirname, '../../site');

      console.log(`Building docs site...`);
      console.log(`  Engine: ${nextAppDir}`);
      console.log(`  Content: ${docsDir}`);
      
      const env = {
        ...process.env,
        DOCS_DIR: docsDir
      };

      const nextCmd = 'next'; 
      const args = ['build'];

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
