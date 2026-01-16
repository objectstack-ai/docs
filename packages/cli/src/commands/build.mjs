import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

export function registerBuildCommand(cli) {
  cli
    .command('build [dir]', 'Build static documentation site')
    .action(async (dir, options) => {
      // 1. Resolve user's docs directory
      const docsDir = dir ? path.resolve(process.cwd(), dir) : path.resolve(process.cwd(), 'content/docs');
      
      // 2. Resolve the Next.js App directory
      let nextAppDir;
      try {
        nextAppDir = path.dirname(require.resolve('@objectdocs/site/package.json'));
      } catch (e) {
        // Fallback for local development
         nextAppDir = path.resolve(__dirname, '../../../site');
      }

      console.log(`Building docs site...`);
      console.log(`  Engine: ${nextAppDir}`);
      console.log(`  Content: ${docsDir}`);
      
      const env = {
        ...process.env,
        DOCS_DIR: docsDir
      };

      const nextCmd = 'npm'; 
      const args = ['run', 'build'];

      const child = spawn(nextCmd, args, {
        stdio: 'inherit',
        env,
        cwd: nextAppDir // CRITICAL: Run in the Next.js app directory
      });

    });
}
