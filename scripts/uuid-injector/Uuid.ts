// Ported from https://github.com/mildronize/mildronize.github.io-old/blob/9f071e49d779e2db1c17482040ce8c4696db5a20/scripts/utils.ts

import fs from 'fs/promises';
import matter from 'gray-matter';
import _ from 'lodash';

const defaultUnicode = 'utf8';

export type AcceptedFrontmatter = Record<string, unknown> & {
  uuid?: string;
};

export class PostContent<Frontmatter extends AcceptedFrontmatter> {
  public frontmatter: Frontmatter;
  public content: string;

  constructor(public relativePath: string, markdown: string) {
    const { data, content } = matter(markdown);
    this.frontmatter = data as Frontmatter;
    this.content = content;
  }

  public async injectUuid() {
    let uuid = '';
    if (this.frontmatter.uuid === undefined) {
      uuid = this.generateUuid(7);
      this.frontmatter.uuid = uuid;
      await fs.writeFile(this.relativePath, matter.stringify(this.content, this.frontmatter), defaultUnicode);
    }
  }

  private generateUuid(length: number) {
    // https://gist.github.com/6174/6062387
    if (length > 10) throw Error('No more than 10 chars');
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  }
}
