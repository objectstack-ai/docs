import fs from 'node:fs';
import path from 'node:path';
import OpenAI from 'openai';

// Supported language suffixes for i18n
const LANGUAGE_SUFFIXES = ['.cn.mdx', '.en.mdx'];
const TARGET_LANGUAGE_SUFFIX = '.cn.mdx';

/**
 * Check if a file has a language suffix
 * @param {string} filePath - The file path to check
 * @returns {boolean} - True if file has a language suffix
 */
function hasLanguageSuffix(filePath) {
  return LANGUAGE_SUFFIXES.some(suffix => filePath.endsWith(suffix));
}

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
      if (file.endsWith('.mdx') && !hasLanguageSuffix(file)) {
        results.push(path.relative(process.cwd(), file));
      }
    }
  });
  return results;
}

export function resolveTranslatedFilePath(enFilePath) {
  // Strategy: Use dot parser convention
  // content/docs/path/to/file.mdx -> content/docs/path/to/file.cn.mdx
  // Skip files that already have language suffix
  const absPath = path.resolve(enFilePath);
  
  // Skip if already has a language suffix
  if (hasLanguageSuffix(absPath)) {
    return absPath;
  }
  
  // Replace .mdx with target language suffix
  if (absPath.endsWith('.mdx')) {
    return absPath.replace(/\.mdx$/, TARGET_LANGUAGE_SUFFIX);
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
