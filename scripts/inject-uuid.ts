import { siteMetadata } from '@/data/siteMetadata';
import chokidar from 'chokidar';
import fs from 'fs/promises';
import glob from 'tiny-glob';
import { PostContent } from './uuid-injector';

async function handleFileChange(path: string, type: 'add' | 'change') {
  if (type === 'add') console.log(`File ${path} has been added`);
  if (type === 'change') console.log(`File ${path} has been changed`);

  const data = await fs.readFile(path, 'utf8');
  const postContent = new PostContent(path, data);
  await postContent.injectUuid();
}

function startWatch(globPattern: string) {
  // Initialize watcher.
  const watcher = chokidar.watch(globPattern, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles

    persistent: true,
  });

  // Add event listeners.
  watcher
    .on('add', async path => handleFileChange(path, 'add'))
    .on('change', async path => handleFileChange(path, 'change'));
}

async function checkDuplicateUuid(globPattern: string) {
  const files = await glob(globPattern);
  console.log(`Found ${files.length} files`);
  const uuids = new Set<string>();
  for(const file of files) {
    console.log(`Checking ${file}`);
    let uuid = '';
    const postContent = new PostContent(file, await fs.readFile(file, 'utf8'));
    if(!postContent.uuid) {
      uuid = await postContent.injectUuid();
    } else {
      uuid = postContent.uuid;
    }
    if(uuids.has(uuid)) {
      console.error(`Duplicate UUID ${uuid} found in ${file}`);
      process.exit(1);
    }
  }
  console.log('No duplicate UUID found');
}


async function main() {
  const globPattern = './src/content/posts/**/*.md';
  if(process.argv[2] === '--watch') {
    return startWatch(globPattern);
  }
  return checkDuplicateUuid(globPattern);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
