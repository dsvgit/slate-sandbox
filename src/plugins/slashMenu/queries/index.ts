import { Editor, Range, Point } from "slate";

export const getBeforeText = (
  editor: Editor,
  start: Point,

  options?: {
    distance?: number;
    unit?: "offset" | "character" | "word" | "line" | "block";
    voids?: boolean;
  }
): string | null => {
  const before = Editor.before(editor, start, options);
  if (!before) return null;

  const beforeRange = Editor.range(editor, before, start);
  const beforeText = Editor.string(editor, beforeRange);

  return beforeText || null;
};

export const getRangeMatch = (
  editor: Editor,
  range: Range,
  regexp: RegExp
): RegExpMatchArray | null => {
  const text = Editor.string(editor, range);
  const match = text.match(regexp);

  return match;
};

export const getBeforeMatch = (
  editor: Editor,
  start: Point,
  regexp: RegExp,
  options?: {
    distance?: number;
    unit?: "offset" | "character" | "word" | "line" | "block";
    voids?: boolean;
  }
): RegExpMatchArray | null => {
  const beforeText = getBeforeText(editor, start, options);
  const beforeMatch = beforeText && beforeText.match(regexp);

  return beforeMatch || null;
};

export const getAfterMatch = (
  editor: Editor,
  start: Point,
  regexp: RegExp,
  options?: {
    distance?: number;
    unit?: "offset" | "character" | "word" | "line" | "block";
    voids?: boolean;
  }
): RegExpMatchArray | null => {
  const after = Editor.after(editor, start, options);

  const afterText = after
    ? Editor.string(editor, Editor.range(editor, start, after))
    : "";
  const afterMatch = afterText.match(regexp);

  return afterMatch || null;
};
