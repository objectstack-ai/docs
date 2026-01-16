import fs from 'node:fs';
import path from 'node:path';
import OpenAI from 'openai';
import { getAllMdxFiles, resolveTranslatedFilePath, translateContent } from '../utils/translate.mjs';

export function registerTranslateCommand(cli) {
  cli
    .command('translate [files...]', 'Translate documentation files')
    .option('--all', 'Translate all files in content/docs')
    .option('--model <model>', 'OpenAI model to use', { default: 'gpt-4o' })
    .action(async (files, options) => {
      const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
      const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL;

      if (!OPENAI_API_KEY) {
        console.error('Error: Missing OPENAI_API_KEY environment variable.');
        process.exit(1);
      }

      const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        baseURL: OPENAI_BASE_URL,
      });

      let targetFiles = [];

      if (options.all) {
        console.log('Scanning for all .mdx files in content/docs...');
        targetFiles = getAllMdxFiles('content/docs');
      } else if (files && files.length > 0) {
          targetFiles = files;
      } else if (process.env.CHANGED_FILES) {
          targetFiles = process.env.CHANGED_FILES.split(',');
      }

      if (targetFiles.length === 0) {
        console.log('No files to translate.');
        console.log('Usage:');
        console.log('  objectdocs translate content/docs/file.mdx');
        console.log('  objectdocs translate --all');
        console.log('  (CI): Set CHANGED_FILES environment variable');
        return;
      }

      console.log(`Processing ${targetFiles.length} files...`);

      for (const file of targetFiles) {
          const enFilePath = path.resolve(process.cwd(), file);
          
          if (!fs.existsSync(enFilePath)) {
              console.log(`File skipped (not found): ${file}`);
              continue;
          }

          const zhFilePath = resolveTranslatedFilePath(enFilePath);
          
          if (zhFilePath === enFilePath) {
              console.log(`Skipping: Source and destination are the same for ${file}`);
              continue;
          }

          console.log(`Translating: ${file} -> ${path.relative(process.cwd(), zhFilePath)}`);

          try {
              const content = fs.readFileSync(enFilePath, 'utf-8');
              const translatedContent = await translateContent(content, openai, options.model);

              const dir = path.dirname(zhFilePath);
              if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir, { recursive: true });
              }

              fs.writeFileSync(zhFilePath, translatedContent);
              console.log(`✓ Automatically translated: ${zhFilePath}`);
          } catch (error) {
              console.error(`✗ Failed to translate ${file}:`, error);
          }
      }
    });
}
