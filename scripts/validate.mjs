import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const registryDir = path.join(rootDir, 'registry');
const rootRegistryJson = path.join(rootDir, 'registry.json');

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

// Validate shadcn registry.json
console.log('\n🔍 Validating root registry.json (shadcn GitHub Registry spec)...');
if (!fs.existsSync(rootRegistryJson)) {
  console.error('❌ Missing root registry.json');
  hasErrors = true;
} else {
  try {
    const regData = JSON.parse(fs.readFileSync(rootRegistryJson, 'utf8'));
    if (!regData.$schema || !regData.name || !Array.isArray(regData.items)) {
      console.error('❌ registry.json missing $schema, name, or items array');
      hasErrors = true;
    } else {
      console.log(`✓ registry.json schema and name valid: "${regData.name}" (${regData.items.length} items)`);
      for (const item of regData.items) {
        if (!item.name || !item.files) {
          console.error(`❌ Registry item missing name or files`);
          hasErrors = true;
        } else {
          for (const f of item.files) {
            const resolvedPath = path.join(rootDir, f.path);
            if (!fs.existsSync(resolvedPath)) {
              console.error(`❌ Registry item "${item.name}" references non-existent file: ${f.path}`);
              hasErrors = true;
            } else {
              console.log(`  ✓ Item [${item.name}] file verified: ${f.path} -> ${f.target || 'default'}`);
            }
          }
        }
      }
    }
  } catch (err) {
    console.error(`❌ registry.json is not valid JSON: ${err.message}`);
    hasErrors = true;
  }
}

if (hasErrors) {
  console.error('\n❌ Validation failed with errors.');
  process.exit(1);
} else {
  console.log('\n✨ All rules and registry.json passed validation!');
}
