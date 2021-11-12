import { Editor, Range } from "slate";
import { withRemoveEmptyNodes } from "@udecode/plate";

import { insertLink, applyLinkToTextBefore } from "plugins/link/transforms";
import { ELEMENT_LINK } from "plugins/link/types";

const triggerRegex = /\s/;
const splitTextByUrlRegex = /((?:(?:https?:\/\/)|(?:www\.))[^\s]+)/;

export const withLink = <T extends Editor>(editor: T) => {
  const { insertText, insertBreak } = editor;

  editor.insertText = (text) => {
    if (text.length > 1) {
      const parts = text.split(splitTextByUrlRegex);

      let idx = 0;
      while (idx < parts.length) {
        const text = parts[idx++];
        const url = parts[idx++];

        insertText(text);

        if (url) {
          insertLink(editor, url);
        }
      }

      return;
    }

    if (
      triggerRegex.test(text) &&
      editor.selection &&
      Range.isCollapsed(editor.selection)
    ) {
      applyLinkToTextBefore(editor);
    }

    insertText(text);
  };

  editor.insertBreak = () => {
    applyLinkToTextBefore(editor);

    insertBreak();
  };

  // empty link still exists in editor (e.g. after backwards removing)
  editor = withRemoveEmptyNodes({ type: ELEMENT_LINK })(editor);

  return editor;
};
