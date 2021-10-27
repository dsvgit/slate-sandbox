import { SPEditor, TElement, WithOverride } from "@udecode/plate-core";
import { ReactEditor } from "slate-react";
import { insertNodes } from "@udecode/plate-common";

import { ELEMENT_LINK } from "plugins/link/defaults";

const urlRegex = /((?:(?:https?:\/\/)|(?:www\.))[^\s]+)/g;

export const withLink =
  (): WithOverride<ReactEditor & SPEditor> => (editor) => {
    const { insertText } = editor;

    editor.insertText = (text) => {
      const parts = text.split(urlRegex);

      let idx = 0;
      while (idx < parts.length) {
        const text = parts[idx++];
        const url = parts[idx++];

        insertText(text);

        if (url) {
          insertNodes<TElement>(editor, {
            type: ELEMENT_LINK,
            url,
            children: [{ text: url }],
          });
        }
      }
    };

    return editor;
  };
