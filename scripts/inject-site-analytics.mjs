import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const measurementId = process.env.VITE_GA_MEASUREMENT_ID?.trim();
const argumentsList = process.argv.slice(2);
const checkOnly = argumentsList.includes('--check');
const distArgument = argumentsList.find((argument) => argument !== '--check');
const distDirectory = path.resolve(distArgument ?? 'dist');

if (!checkOnly && !measurementId) {
  console.log('Skipping shared analytics injection because VITE_GA_MEASUREMENT_ID is not set.');
  process.exit(0);
}

if (measurementId && !/^G-[A-Z0-9]+$/.test(measurementId)) {
  throw new Error('VITE_GA_MEASUREMENT_ID must contain a valid GA4 measurement ID.');
}

async function findHtmlFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? findHtmlFiles(absolutePath) : [absolutePath];
  }));

  return files.flat().filter((filePath) => filePath.endsWith('.html'));
}

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function analyticsContext(relativePath) {
  const normalizedPath = relativePath.replaceAll(path.sep, '/');
  const parts = normalizedPath.split('/');

  if (parts[0] === 'projects' && parts.length >= 3) {
    return {
      siteArea: 'nested_project',
      contentName: parts[1],
    };
  }

  if (parts[0] === 'privacy') {
    return {
      siteArea: 'privacy',
      contentName: parts.length === 2 ? 'privacy_directory' : parts[1],
    };
  }

  return null;
}

const htmlFiles = await findHtmlFiles(distDirectory);
const missingAnalytics = [];
let targetCount = 0;
let injectedCount = 0;
let existingCount = 0;

for (const htmlFile of htmlFiles) {
  const relativePath = path.relative(distDirectory, htmlFile);
  const context = analyticsContext(relativePath);
  if (!context) continue;
  targetCount += 1;

  const html = await fs.readFile(htmlFile, 'utf8');
  const hasAnalytics = html.includes('data-site-analytics="true"')
    && html.includes(`data-site-area="${context.siteArea}"`)
    && (!measurementId || html.includes(`data-measurement-id="${measurementId}"`));

  if (hasAnalytics) {
    existingCount += 1;
    continue;
  }

  if (checkOnly) {
    missingAnalytics.push(relativePath);
    continue;
  }

  if (!html.includes('</head>')) {
    throw new Error(`Cannot inject analytics because ${relativePath} has no closing head tag.`);
  }

  const snippet = [
    '    <script',
    '      defer',
    '      src="/site-analytics.js"',
    '      data-site-analytics="true"',
    `      data-measurement-id="${escapeAttribute(measurementId ?? '')}"`,
    `      data-site-area="${escapeAttribute(context.siteArea)}"`,
    `      data-content-name="${escapeAttribute(context.contentName)}"`,
    '    ></script>',
  ].join('\n');

  await fs.writeFile(htmlFile, html.replace('</head>', `${snippet}\n  </head>`));
  injectedCount += 1;
}

if (targetCount === 0) {
  throw new Error(`No nested project or privacy HTML files found in ${distDirectory}.`);
}

if (missingAnalytics.length > 0) {
  throw new Error(`Analytics is missing from:\n${missingAnalytics.join('\n')}`);
}

if (checkOnly) {
  console.log(`Verified shared analytics on ${targetCount} HTML files.`);
} else {
  console.log(
    `Shared analytics ready on ${targetCount} HTML files `
      + `(${injectedCount} injected, ${existingCount} already configured).`,
  );
}
