import type { AstroFile } from "..";

export function buildAstroFile<T extends object = {}>(history: string[]): AstroFile<T> {
  return {
    cwd: '',
    data: {
      astro: {
        frontmatter: {} as T
      },
    },
    history,
    messages: [],
    value: '',
  }
}