import { Editor, Transforms, Path } from "slate";

import { getRangeBefore } from "plugins/link/queries/getRangeBefore";
import { isUrl } from "utils/isUrl";
import { createLinkElement, isLinkElement } from "plugins/link/utils";

const matchUrlRegex = /(?<=^|\s)((?:(?:https?:\/\/)|(?:www\.))[^\s]+)$/;

export const insertLink = (editor: Editor, url: string) => {
  return Transforms.insertNodes(editor, createLinkElement({ url, text: url }));
};

export const applyLinkToSelection = (editor: Editor, url: string) => {
  // check if selection includes inline elements, but not links (we just unwrap it before new wrapping)
  const [inlinesMatch] = Editor.nodes(editor, {
    mode: "lowest",
    match: (node) => Editor.isInline(editor, node) && !isLinkElement(node),
  });

  if (!inlinesMatch && editor.selection) {
    let at;
    at = Editor.unhangRange(editor, editor.selection);
    // prevent nested links
    Transforms.unwrapNodes(editor, {
      match: isLinkElement,
      at,
    });

    at = Editor.unhangRange(editor, editor.selection);
    Transforms.wrapNodes(editor, createLinkElement({ url }), {
      split: true,
      at,
    });
  }
};

export const applyLinkToTextBefore = (editor: Editor) => {
  // get range before current selection which is match regex
  const result = getRangeBefore(editor, {
    regexp: matchUrlRegex,
  });

  if (result) {
    const { range } = result;

    // check if selection includes inline elements
    const [inlinesMatch] = Editor.nodes(editor, {
      at: range,
      mode: "lowest",
      match: (node) => Editor.isInline(editor, node),
    });

    const url = Editor.string(editor, range).trim();

    if (!inlinesMatch && isUrl(url)) {
      // wrap matched range into link
      Transforms.wrapNodes(editor, createLinkElement({ url }), {
        split: true,
        at: range,
      });
    }
  }
};

export const updateLinkAtPath = (editor: Editor, path: Path, url: string) => {
  Transforms.setNodes(editor, { url }, { at: path, match: isLinkElement });
};

export const removeLinkAtPath = (editor: Editor, path: Path) => {
  Transforms.unwrapNodes(editor, { match: isLinkElement, at: path });
};
