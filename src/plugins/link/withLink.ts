import { SPEditor, WithOverride } from "@udecode/plate-core";
import { ReactEditor } from "slate-react";

export const withLink =
  (): WithOverride<ReactEditor & SPEditor> => (editor) => {
    const { insertText } = editor;

    // editor.insertText = (text) => {
    //   console.log(text)
    //   insertText(text);
    // };

    return editor;
  };
