import visit from 'unist-util-visit'; // Downgrade to v2.0.3 for supporting common js
// For ESM remark, please use Root from `mdast` instead
// import type { Root } from 'mdast';
/**
 * One place in a source file.
 * Duplicated from `@types/unist` packages
 */
export interface Point {
  /**
   * Line in a source file (1-indexed integer).
   */
  line: number;

  /**
   * Column in a source file (1-indexed integer).
   */
  column: number;
  /**
   * Character in a source file (0-indexed integer).
   */
  offset?: number | undefined;
}


/**
 * Location of a node in a source file.
 * Duplicated from `@types/unist` packages
 */
export interface Position {
    /**
     * Place of the first character of the parsed source region.
     */
    start: Point;

    /**
     * Place of the first character after the parsed source region.
     */
    end: Point;

    /**
     * Start column at each index (plus start line) in the source region,
     * for elements that span multiple lines.
     */
    indent?: number[] | undefined;
}


export type ImageNode = {
  type: 'image';
  url: string;
  title: string | null;
  alt?: string;
  position?: Position;
}

/**
 * There's many types of node in remark
 * I only need to handle `image` node
 */
export type TreeNode = Parameters<visit.Visitor<ImageNode>>[0];