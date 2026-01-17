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
      // Only include .mdx files that don't have language suffix
      if (file.endsWith('.mdx') && !file.endsWith('.cn.mdx') && !file.endsWith('.en.mdx')) {
        results.push(path.relative(process.cwd(), file));
      }
    }
  });
  return results;
}

export function resolveTranslatedFilePath(enFilePath) {
  // Strategy: Use dot parser convention
  // content/docs/path/to/file.mdx -> content/docs/path/to/file.cn.mdx
  // Skip files that already have language suffix (.cn.mdx or .en.mdx)
  const absPath = path.resolve(enFilePath);
  
  // Skip if already has .cn.mdx or .en.mdx suffix
  if (absPath.endsWith('.cn.mdx') || absPath.endsWith('.en.mdx')) {
    return absPath;
  }
  
  // Replace .mdx with .cn.mdx
  if (absPath.endsWith('.mdx')) {
    return absPath.replace(/\.mdx$/, '.cn.mdx');
  }
  
  return absPath;
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
