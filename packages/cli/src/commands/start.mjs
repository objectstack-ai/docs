import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

export function registerStartCommand(cli) {
  cli.command('start [dir]', 'Start the production server')
    .action((dir) => {
      // 1. Resolve Next.js App directory
      let nextAppDir;
      try {
        nextAppDir = path.dirname(require.resolve('@objectdocs/site/package.json'));
      } catch (e) {
         nextAppDir = path.resolve(__dirname, '../../../site');
      }

      // 2. Check config
      let isStatic = false;
      try {
        const configPath = path.resolve(process.cwd(), 'objectdocs.json');
        if (fs.existsSync(configPath)) {
          const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
          if (config.build?.output === 'export') {
            isStatic = true;
          }
        }
      } catch (e) {
        // ignore
      }

      if (isStatic || (dir && dir !== 'out')) {
        // Static Mode
        const targetDir = dir ? path.resolve(process.cwd(), dir) : path.resolve(process.cwd(), 'out');
        console.log(`Serving static site from: ${targetDir}`);
        
        const child = spawn('npx', ['serve', targetDir], {
          stdio: 'inherit',
          shell: true
        });
        
        child.on('error', (err) => {
          console.error('Failed to start server:', err);
        });
      } else {
        // Dynamic Mode (Next.js start)
        console.log('Starting Next.js production server...');
        console.log(`  Engine: ${nextAppDir}`);
        
        const child = spawn('npm', ['start'], {
          cwd: nextAppDir,
          stdio: 'inherit',
          env: {
            ...process.env,
            DOCS_DIR: path.resolve(process.cwd(), 'content/docs')
          }
        });
      }
    });
}
