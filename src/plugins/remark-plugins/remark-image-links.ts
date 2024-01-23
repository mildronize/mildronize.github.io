// From https://github.com/mildronize/blog-next/blob/main/blog-app/libs/markdown-parser/remark-plugins/remark-image-links.ts
// Adapted from original: https://github.com/Pondorasti/remark-img-links

import visit from 'unist-util-visit'; // Downgrade to v2.0.3 for supporting common js
import path from 'path';
import type { ImageNode, TreeNode } from './remark-types';
import type { AstroFile } from '..';

export interface RemarkImageLinkOption {
  contentDirectory: string;
}

export function getFirstHistory(file: AstroFile): string {
  if (!file.history || file.history.length === 0)
    throw Error(`[remark-image-links] Can't get history from file: ${JSON.stringify(file, null, 2)}`);
  return file.history[0];
}

export function getPostDirectory(prefixPath: string, contentPath: string = '') {
  const parsedPrefixPath = prefixPath.replace(/^\/*/, '');
  const parsedPath = contentPath.replace(new RegExp(`${parsedPrefixPath}/*`), '');
  const split = parsedPath.split('/');
  const paths = split.slice(0, split.length - 1);
  return paths.join('/');
}

export default function remarkImageLink(options: RemarkImageLinkOption) {
  return (tree: TreeNode, file: AstroFile) => {

    const _postDirectory = getPostDirectory(
      path.join(file.cwd, process.env.NODE_ENV !== 'development' ? options.contentDirectory : ''),
      getFirstHistory(file)
    );

    visit<ImageNode>(tree, 'image', node => {
      // console.log(`[remark-image-links] processing node: ${JSON.stringify(node, null, 2)}`);
      // console.log(`[remark-image-links] processing file: ${getFirstHistory(file)}`);
      // console.log(`[remark-image-links] Fixing image URL: ${node.url}`);

      // Sanitize URL by removing leading `/`
      const imageURL = node.url.replace(/^\//, '');
      if (!isAbsoluteURL(imageURL)) {
        node.url = path.join(_postDirectory, imageURL);
        console.log(`[remark-image-links] Fixing image URL: ${imageURL} -> ${node.url}`);
      }
    });
  };
}

export function isAbsoluteURL(url: string): boolean {
  try {
    new URL('', url);
  } catch (error: any) {
    const msg: string = error.message;
    if (msg.search('Invalid base URL') >= 0 || msg.search('Invalid URL') >= 0) return false;
    else {
      throw Error(`Can't validate absolute URL (${url}): ${error.message}`);
    }
  }
  return true;
}
