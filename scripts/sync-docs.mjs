import { closeSync, copyFileSync, existsSync, mkdirSync, openSync, readSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = resolve(root, 'public', 'docs');
const documents = ['Amin-Hanif-Resume.pdf', 'Amin-Hanif-Portfolio.pdf'];
const checkOnly = process.argv.includes('--check');

function argumentValue(name) {
  const prefix = `${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : undefined;
}

function isPdf(path) {
  if (!existsSync(path)) return false;
  const stats = statSync(path);
  if (!stats.isFile() || stats.size <= 0) return false;
  const file = openSync(path, 'r');
  const header = Buffer.alloc(4);
  readSync(file, header, 0, 4, 0);
  closeSync(file);
  return header.toString('utf8') === '%PDF';
}

function findSourceDir() {
  const explicit = argumentValue('--source') || process.env.CV_PDF_DIR;
  const candidates = [
    explicit,
    resolve(root, 'output', 'pdf'),
    resolve(root, '..', 'CV', 'output', 'pdf'),
    resolve(root, '..', '..', '..', 'output', 'pdf'),
  ].filter(Boolean);

  return candidates.find((candidate) => documents.every((name) => isPdf(resolve(candidate, name))));
}

if (checkOnly) {
  const missing = documents.filter((name) => !isPdf(resolve(docsDir, name)));
  if (missing.length > 0) {
    console.error(`Missing or invalid docs: ${missing.join(', ')}`);
    process.exit(1);
  }
  console.log(`Verified ${documents.length} PDF docs in public/docs.`);
  process.exit(0);
}

const sourceDir = findSourceDir();
if (!sourceDir) {
  console.error('Could not find generated PDFs.');
  console.error('Run with --source=\"F:\\\\Github Projects\\\\CV\\\\output\\\\pdf\" or set CV_PDF_DIR.');
  process.exit(1);
}

mkdirSync(docsDir, { recursive: true });

for (const name of documents) {
  const source = resolve(sourceDir, name);
  const destination = resolve(docsDir, name);
  copyFileSync(source, destination);
  console.log(`Copied ${name}`);
}
