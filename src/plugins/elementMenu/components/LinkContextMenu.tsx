import React, { useEffect, useState } from "react";
import { isHotkey } from "is-hotkey";
import { ReactEditor, useSlateStatic } from "slate-react";

import { LinkElement } from "plugins/link/types";
import { removeLinkAtPath, updateLinkAtPath } from "plugins/link/transforms";

type LinkContextMenuProps = {
  element: LinkElement;
};

const LinkContextMenu = (props: LinkContextMenuProps) => {
  const { element } = props;
  const editor = useSlateStatic();
  const [value, setValue] = useState(element.url);

  useEffect(() => {
    // reset
    setValue(element.url);
  }, [element]);

  const handleUpdate = () => {
    const path = ReactEditor.findPath(editor, element);
    if (value) {
      updateLinkAtPath(editor, path, value);
    } else {
      removeLinkAtPath(editor, path);
    }
  };

  return (
    <div
      contentEditable={false}
      style={{ position: "fixed", right: 0, top: 0 }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (isHotkey("Enter", e)) {
            handleUpdate();
          }
        }}
      />
    </div>
  );
};

export default LinkContextMenu;
