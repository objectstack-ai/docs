import fs from 'node:fs';
import path from 'node:path';
import OpenAI from 'openai';

// 配置
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o';

if (!OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY environment variable');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: OPENAI_BASE_URL,
});

async function translateContent(content) {
  const prompt = `
You are a technical documentation translator for "ObjectStack".
Translate the following MDX documentation from English to Chinese (Simplified).

Rules:
1. Preserve all MDX frontmatter (keys and structure). only translate the values if they are regular text.
2. Preserve all code blocks exactly as they are. Do not translate code comments unless they are purely explanatory and not part of the logic.
3. Use professional software terminology (e.g. "ObjectStack", "ObjectQL", "ObjectUI" should strictly remain in English).
4. "Local-First" translate to "本地优先".
5. "Protocol-Driven" translate to "协议驱动".
6. Maintain the original markdown formatting (links, bold, italics).

Content to translate:
---
${content}
---
`;

  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Translation failed:', error);
    throw error;
  }
}

async function main() {
  const isAll = process.argv.includes('--all');
  let files = [];

  if (isAll) {
    console.log('Scanning for all .en.mdx files...');
    files = getAllEnMdxFiles('content/docs');
  } else {
    files = process.env.CHANGED_FILES ? process.env.CHANGED_FILES.split(',') : [];
  }

  if (files.length === 0) {
    console.log('No files to translate.');
    console.log('Usage:');
    console.log('  Automatic (CI): Set CHANGED_FILES environment variable');
    console.log('  Manual (All):   node scripts/translate-docs.mjs --all');
    return;
  }

  console.log(`Processing ${files.length} files...`);

  for (const file of files) {
    const enFilePath = path.resolve(process.cwd(), file);
    
    // Check if file exists (it might have been deleted)
    if (!fs.existsSync(enFilePath)) {
      console.log(`File skipped (not found): ${file}`);
      continue;
    }


    // Determine target file path
    const zhFilePath = resolveTranslatedFilePath(enFilePath);

    if (zhFilePath === enFilePath) {
      console.log(`Skipping non-EN file: ${file}`);
      continue;
    }

    console.log(`Translating: ${file} -> ${path.relative(process.cwd(), zhFilePath)}`);
    
    try {
      const content = fs.readFileSync(enFilePath, 'utf-8');
      const translatedContent = await translateContent(content);
      
      // Ensure directory exists
      const dir = path.dirname(zhFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(zhFilePath, translatedContent);
      console.log(`✓ Automatically translated: ${zhFilePath}`);
    } catch (error) {
      console.error(`✗ Failed to translate ${file}:`, error);
      // We don't exit process so other files can still be processed
    }
  }
}

/**
 * Resolves the path where the translated file should be saved.
 * You can customize this function to change the directory structure.
 */
function resolveTranslatedFilePath(enFilePath) {
  // Strategy 1: Same directory, different extension (Default)
  // content/docs/intro.en.mdx -> content/docs/intro.zh-CN.mdx
  // return enFilePath.replace('.en.mdx', '.zh-CN.mdx');

  // Strategy 2: Separate directory tree
  // content/docs/intro.en.mdx -> content/docs-zh/intro.zh-CN.mdx
  const relativePath = path.relative(path.join(process.cwd(), 'content/docs'), enFilePath);
  return path.join(process.cwd(), 'content/docs-zh', relativePath.replace('.en.mdx', '.zh-CN.mdx'));
}

function getAllEnMdxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllEnMdxFiles(file));
    } else {
      if (file.endsWith('.en.mdx')) {
        // Return relative path to process.cwd() to match CHANGED_FILES format
        results.push(path.relative(process.cwd(), file));
      }
    }
  });
  return results;
}

main();
