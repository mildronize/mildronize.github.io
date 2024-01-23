import { siteMetadata } from '@/data/siteMetadata';
import chokidar from 'chokidar';
import fs from 'fs/promises';
import { PostContent } from './uuid-injector';

async function handleFileChange(path: string, type: 'add' | 'change') {
  if (type === 'add') console.log(`File ${path} has been added`);
  if (type === 'change') console.log(`File ${path} has been changed`);

  const data = await fs.readFile(path, 'utf8');
  const postContent = new PostContent(path, data);
  await postContent.injectUuid();
}

async function main() {
  // Initialize watcher.
  const watcher = chokidar.watch('./src/content/posts/**/*.md', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles

    persistent: true,
  });

  // Add event listeners.
  watcher
    .on('add', async path => handleFileChange(path, 'add'))
    .on('change', async path => handleFileChange(path, 'change'));
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
