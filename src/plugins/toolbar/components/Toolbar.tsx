import { useEffect, useState } from "react";
import { Editor, Node } from "slate";
import { useEditorRef, useEditorState } from "@udecode/plate";

import { ToolbarProps } from "plugins/toolbar/types";
import { applyLinkToSelection } from "plugins/link/transforms";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const LinkToolbar = () => {
  const editor = useEditorState();
  const [url, setUrl] = useState("https://google.com");

  useEffect(() => {
    // @ts-ignore
    window.editor = editor;
  }, [editor]);

  return (
    <div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          applyLinkToSelection(editor, url);
        }}
      >
        apply
      </button>
    </div>
  );
};

const Test = () => {
  const editor = useEditorRef();

  return (
    <div>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          if (editor.selection) {
            const fragment = Editor.fragment(editor, editor.selection);
            console.log(fragment);
          }
        }}
      >
        fragment
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          if (editor.selection) {
            const fragment = Editor.fragment(editor, editor.selection);

            const hasInlines = fragment.some((node) =>
              Array.from(Node.descendants(node)).some(([node]) =>
                Editor.isInline(editor, node)
              )
            );

            console.log(fragment, hasInlines);
          }
        }}
      >
        fragment nodes
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          if (editor.selection) {
          }
        }}
      >
        editor nodes
      </button>
    </div>
  );
};

export const Toolbar = (_props: ToolbarProps) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <LinkToolbar />
      <Test />
    </div>
  );
};
