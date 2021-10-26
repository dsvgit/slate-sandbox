import {useEffect, useState} from "react";
import { useEditorRef } from "@udecode/plate";

import { ToolbarProps } from "plugins/toolbar/types";
import { upsertLink } from "plugins/link/transforms/upsertLink";

const LinkToolbar = () => {
  const editor = useEditorRef();
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
          console.log(editor)
          upsertLink(editor, { url, wrap: true });
        }}
      >
        apply
      </button>
    </div>
  );
};

export const Toolbar = (_props: ToolbarProps) => {
  return (
    <div style={{marginBottom: 20}}>
      <LinkToolbar />
    </div>
  );
};
