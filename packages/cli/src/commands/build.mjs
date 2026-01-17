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

      // Copy user config and assets to nextAppDir
      const userConfigPath = path.resolve(process.cwd(), 'content/objectdocs.json');
      if (fs.existsSync(userConfigPath)) {
        console.log(`  Copying config from ${userConfigPath}`);
        fs.cpSync(userConfigPath, path.join(nextAppDir, 'objectdocs.json'));
      }
      
      const userPublicPath = path.resolve(process.cwd(), 'public');
      if (fs.existsSync(userPublicPath)) {
        console.log(`  Copying public assets from ${userPublicPath}`);
        const targetPublicDir = path.join(nextAppDir, 'public');
        if (!fs.existsSync(targetPublicDir)) {
          fs.mkdirSync(targetPublicDir, { recursive: true });
        }
        fs.cpSync(userPublicPath, targetPublicDir, { recursive: true, force: true });
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

      child.on('close', (code) => {
        if (code === 0) {
          // Copy output to project root
          const src = path.join(nextAppDir, 'out');
          const dest = path.join(process.cwd(), 'out');
          
          if (fs.existsSync(src)) {
            console.log(`\nMoving build output to ${dest}...`);
            if (fs.existsSync(dest)) {
                fs.rmSync(dest, { recursive: true, force: true });
            }
            fs.cpSync(src, dest, { recursive: true });
            console.log(`Build successfully output to: ${dest}`);
          } else {
            // Check for .next directory (dynamic build)
            const srcNext = path.join(nextAppDir, '.next');
            const destNext = path.join(process.cwd(), '.next');
            
            if (fs.existsSync(srcNext) && srcNext !== destNext) {
               console.log(`\nLinking .next build output to ${destNext}...`);
               if (fs.existsSync(destNext)) {
                   fs.rmSync(destNext, { recursive: true, force: true });
               }
               // Use symlink instead of copy to preserve internal symlinks in .next (pnpm support)
               fs.symlinkSync(srcNext, destNext, 'dir');
               console.log(`Build successfully linked to: ${destNext}`);
            } else {
               console.log(`\nNo 'out' directory generated in ${src}.`);
               console.log(`This is expected if 'output: export' is disabled.`);
            }
          }
        }
        process.exit(code);
      });

    });
}
