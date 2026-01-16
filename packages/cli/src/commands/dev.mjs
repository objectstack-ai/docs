import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

export function registerDevCommand(cli) {
  cli
    .command('dev [dir]', 'Start development server')
    .option('--port <port>', 'Port to listen on', { default: 7777 })
    .action(async (dir, options) => {
      // 1. Resolve user's docs directory (Absolute path)
      const docsDir = dir ? path.resolve(process.cwd(), dir) : path.resolve(process.cwd(), 'content/docs');
      
      // 2. Resolve the Next.js App directory
      let nextAppDir;
      try {
        nextAppDir = path.dirname(require.resolve('@objectdocs/site/package.json'));
      } catch (e) {
        // Fallback for local development
         nextAppDir = path.resolve(__dirname, '../../../site');
      }

      console.log(`Starting docs server...`);
      console.log(`  Engine: ${nextAppDir}`);
      console.log(`  Content: ${docsDir}`);
      
      const env = {
        ...process.env,
        DOCS_DIR: docsDir,
        PORT: options.port
      };
      
      const nextCmd = 'npm'; 
      const args = ['run', 'dev', '--', '-p', options.port];

      let child;
      let isRestarting = false;
      let debounceTimer;

      const startServer = () => {
        child = spawn(nextCmd, args, {
          stdio: 'inherit',
          env,
          cwd: nextAppDir // CRITICAL: Run in the Next.js app directory
        });

        child.on('close', (code) => {
          if (isRestarting) {
            isRestarting = false;
            startServer();
          } else {
            // Only exit if we are not restarting. 
            // Null code means killed by signal (like our kill() call), but we handle that via flag.
            process.exit(code || 0);
          }
        });
      };

      startServer();

      // Watch for config changes
      const configFile = path.resolve(process.cwd(), 'objectdocs.json');
      if (fs.existsSync(configFile)) {
        console.log(`Watching config: ${configFile}`);
        fs.watch(configFile, (eventType) => {
          if (eventType === 'change') {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
              console.log('\nConfig changed. Restarting server...');
              isRestarting = true;
              child.kill();
            }, 500);
          }
        });
      }
    });
}
