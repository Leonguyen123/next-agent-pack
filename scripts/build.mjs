import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const stacksDir = path.join(rootDir, 'stacks');
const registryDir = path.join(rootDir, 'registry');
const distDir = path.join(rootDir, 'dist');
const localCursorRulesDir = path.join(rootDir, '.cursor', 'rules');

console.log('🚀 Building next-agent-pack distribution bundles...');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

if (!fs.existsSync(localCursorRulesDir)) {
  fs.mkdirSync(localCursorRulesDir, { recursive: true });
}

const stacks = fs.readdirSync(stacksDir);

for (const stackName of stacks) {
  const stackPath = path.join(stacksDir, stackName);
  if (!fs.statSync(stackPath).isDirectory()) continue;

  const manifestPath = path.join(stackPath, 'manifest.json');
  if (!fs.existsSync(manifestPath)) continue;

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const targetDistName = stackName === 'next15-shadcn-minimal' ? 'next15-shadcn' : stackName;
  const targetDistDir = path.join(distDir, targetDistName);

  if (!fs.existsSync(targetDistDir)) {
    fs.mkdirSync(targetDistDir, { recursive: true });
  }

  console.log(`📦 Processing stack: ${manifest.name} -> dist/${targetDistName}`);

  for (const [sourceRelative, distFileName] of Object.entries(manifest.distMapping)) {
    const sourcePath = path.join(registryDir, sourceRelative);
    if (!fs.existsSync(sourcePath)) {
      console.error(`❌ Source rule not found: ${sourcePath}`);
      process.exit(1);
    }

    const content = fs.readFileSync(sourcePath, 'utf8');
    const targetPath = path.join(targetDistDir, distFileName);
    fs.writeFileSync(targetPath, content, 'utf8');
    console.log(`  ✓ Written ${distFileName}`);

    // If minimal stack, dogfood into .cursor/rules as well
    if (stackName === 'next15-shadcn-minimal') {
      const localRulePath = path.join(localCursorRulesDir, distFileName);
      fs.writeFileSync(localRulePath, content, 'utf8');
    }
  }
}

console.log('✅ Build completed successfully!');
