import { siteMetadata } from '@/data/siteMetadata';
import copy from 'recursive-copy';

const outDirectory = 'dist';

const option = {
  overwrite: true,
  filter: ['**/**.png', '**/**.jpg', '!**/**.md'],
};

async function main() {
  try {
    const results = await copy(siteMetadata.content.contentDirectory, outDirectory, option);
    for(const result of results){
        console.info(`Copied "${result.dest}"`);
    }
    console.info('Done copied assets file ' + results.length + ' files');
  } catch (error) {
    console.error('Copy failed: ' + error);
  }
}

main();
