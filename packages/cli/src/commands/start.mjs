import { spawn } from 'node:child_process';
import path from 'node:path';

export function registerStartCommand(cli) {
  cli.command('start [dir]', 'Serve the static site')
    .action((dir = 'out') => {
      const targetDir = path.resolve(process.cwd(), dir);
      console.log(`Serving static site from: ${targetDir}`);
      
      // Use npx serve to serve the directory
      const child = spawn('npx', ['serve', targetDir], {
        stdio: 'inherit',
        shell: true
      });
      
      child.on('error', (err) => {
        console.error('Failed to start server:', err);
        console.log('You may need to install serve: npm install -g serve');
      });
    });
}
