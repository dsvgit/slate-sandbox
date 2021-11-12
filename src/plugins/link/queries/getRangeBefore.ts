import { Editor, Location, Range } from "slate";

export const getRangeBefore = (
  editor: Editor,
  {
    at = editor.selection as Location,
    regexp = /.*/,
  }: { at?: Location; regexp?: RegExp } = {}
): { range: Range } | undefined => {
  if (!at) {
    return;
  }

  at = Editor.range(editor, at);

  const currentBlockEntry = Editor.above(editor, {
    match: (node) => Editor.isBlock(editor, node),
  });

  if (!currentBlockEntry) {
    return;
  }

  const blockStart = Editor.start(editor, currentBlockEntry[1]);
  const contentBeforeSelection = Editor.string(editor, {
    anchor: blockStart,
    focus: at.anchor,
  });

  const match = contentBeforeSelection.match(regexp);

  if (!match) {
    return;
  }

  const anchor = Editor.before(editor, editor.selection as Location, {
    distance: match[0].length,
    unit: "character",
  });

  if (anchor) {
    return {
      range: {
        anchor,
        focus: at.anchor,
      },
    };
  }
};
