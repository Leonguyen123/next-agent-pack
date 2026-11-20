import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const registryDir = path.join(rootDir, 'registry');

function getAllFiles(dir, ext = '.mdc') {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, ext));
    } else if (file.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

console.log('🔍 Validating registry rule files...');

const ruleFiles = getAllFiles(registryDir, '.mdc');
let hasErrors = false;

for (const filePath of ruleFiles) {
  const relPath = path.relative(rootDir, filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check Frontmatter
  if (!content.startsWith('---')) {
    console.error(`❌ [${relPath}]: Missing frontmatter start delimiter ('---')`);
    hasErrors = true;
    continue;
  }

  const secondDelimiterIndex = content.indexOf('\n---', 3);
  if (secondDelimiterIndex === -1) {
    console.error(`❌ [${relPath}]: Missing frontmatter end delimiter ('---')`);
    hasErrors = true;
    continue;
  }

  const frontmatter = content.substring(3, secondDelimiterIndex);
  if (!frontmatter.includes('description:')) {
    console.error(`❌ [${relPath}]: Frontmatter missing 'description' field`);
    hasErrors = true;
  }
  if (!frontmatter.includes('globs:')) {
    console.error(`❌ [${relPath}]: Frontmatter missing 'globs' field`);
    hasErrors = true;
  }

  // Token / Word budget check (aim for concise rules, max 1500 words)
  const words = content.trim().split(/\s+/).length;
  if (words > 1500) {
    console.warn(`⚠️ [${relPath}]: Rule has ${words} words (recommended < 1500 to save context tokens)`);
  } else {
    console.log(`✓ [${relPath}]: OK (${words} words)`);
  }
}

if (hasErrors) {
  console.error('\n❌ Validation failed with errors.');
  process.exit(1);
} else {
  console.log('\n✨ All rules passed validation!');
}
