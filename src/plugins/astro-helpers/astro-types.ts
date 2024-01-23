
/**
 * Astro file properties
 * Refer: https://docs.astro.build/en/guides/markdown-content/#modifying-frontmatter-programmatically
 */

export interface AstroFile<T extends object = Record<string, unknown>> {
  cwd: string;
  data: {
    astro: {
      frontmatter: T;
    };
  };
  history: string[];
  messages: unknown[];
  value: string;
}
