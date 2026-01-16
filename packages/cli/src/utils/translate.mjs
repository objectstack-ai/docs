import fs from 'node:fs';
import path from 'node:path';
import OpenAI from 'openai';

export function getAllMdxFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMdxFiles(file));
    } else {
      if (file.endsWith('.mdx')) {
        results.push(path.relative(process.cwd(), file));
      }
    }
  });
  return results;
}

export function resolveTranslatedFilePath(enFilePath) {
  // Strategy: content/docs/path/to/file.mdx -> content/docs-cn/path/to/file.mdx
  const docsRoot = path.join(process.cwd(), 'content/docs');
  
  // If input path is relative, make it absolute first to check
  const absPath = path.resolve(enFilePath);
  
  if (!absPath.startsWith(docsRoot)) {
     // Fallback or specific logic if file is not in content/docs
     return enFilePath.replace('content/docs', 'content/docs-cn');
  }

  const relativePath = path.relative(docsRoot, enFilePath);
  return path.join(process.cwd(), 'content/docs-cn', relativePath);
}

export async function translateContent(content, openai, model) {
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
      model: model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Translation failed:', error);
    throw error;
  }
}
