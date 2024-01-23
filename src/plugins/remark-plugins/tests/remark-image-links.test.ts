import remark from 'remark'; // Downgrade to v13.0.0 for supporting common js
import remarkImageLink, { getPostDirectory } from '../remark-image-links';
import { buildAstroFile, type AstroFile } from '@/plugins';
/**
 * Helper function for currying remarkImageLink for Astro only
 * Due to `AstroFile` is not compatible with remark plugin interface
 */
const curriedRemarkImageLink = (file: AstroFile) => (option: {contentDirectory: string}) => (tree: any) => remarkImageLink(option)(tree, file);

describe('remarkImageLink', () => {
  const cases = [
    // TODO: Fix this test later
    // ['![](cover.jpg)', '/posts/slug-id/', '![](/posts/slug-id/cover.jpg)'],
    // ['![](error-sample.png)', '/posts/slug-id/', '![](/posts/slug-id/error-sample.png)'],
    // Not parse abs URL
    ['![](https://test.com/img.jpg)', '/posts/slug-id/', '![](https://test.com/img.jpg)'],
    ['![](http://test.com/img.jpg)', '/posts/slug-id/', '![](http://test.com/img.jpg)'],
  ];

  test.each(cases)(`remarkImageLink(%s,%s) should be %s`, async (markdown, contentPath, expected) => {
    // Mock AstroFile
    const astroFile: AstroFile = buildAstroFile([
      '/Users/username/Projects/astro-blog/src/pages/posts/slug-id.md'
    ]);

    const _result = await remark().use(curriedRemarkImageLink(astroFile), { contentDirectory: '' }).process(markdown);
    // trim newline
    const result = _result.toString().replace(/^\s+|\s+$/g, '');
    expect(result).toEqual(expected);
  });
});


describe('getPostDirectory', () => {
  type Case = {
    prefixPath: string;
    contentPath: string;
    expected: string;
  };

  const cases: Case[] = [
    { prefixPath: '_post', contentPath: '_post/preview/test/my-post/readme.md', expected: 'preview/test/my-post' },
    { prefixPath: '_post', contentPath: '_post/preview/test.md', expected: 'preview' },
    { prefixPath: '_post', contentPath: '_post/preview.md', expected: '' },
    { prefixPath: '_contents', contentPath: '_contents/post/preview.md', expected: 'post' },
  ];

  test.each(cases)(`getPostDirectory(%s, %s) should be %s`, ({ prefixPath, contentPath, expected }) => {
    expect(getPostDirectory(prefixPath, contentPath)).toEqual(expected);
  });
});
