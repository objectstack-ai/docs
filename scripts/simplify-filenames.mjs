import fs from 'fs';
import path from 'path';

function simplifyDirectory(dir, langSuffix) {
  if (!fs.existsSync(dir)) return;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      simplifyDirectory(fullPath, langSuffix);
    } else {
      // Handle MDX files
      if (entry.name.endsWith(`.${langSuffix}.mdx`)) {
        const newName = entry.name.replace(`.${langSuffix}.mdx`, '.mdx');
        const newPath = path.join(dir, newName);
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${entry.name} -> ${newName}`);
      }
      // Handle JSON files (meta)
      else if (entry.name.endsWith(`.${langSuffix}.json`)) {
        const newName = entry.name.replace(`.${langSuffix}.json`, '.json');
        const newPath = path.join(dir, newName);
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${entry.name} -> ${newName}`);
      }
    }
  }
}

console.log('Simplifying content/docs (.en)...');
simplifyDirectory(path.resolve('content/docs'), 'en');

console.log('Simplifying content/docs-zh (.zh-CN)...');
simplifyDirectory(path.resolve('content/docs-zh'), 'zh-CN');
