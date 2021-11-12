import React, { useLayoutEffect, useState } from "react";
import { Editor, Node } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";

import LinkContextMenu from "plugins/elementMenu/components/LinkContextMenu";
import { isLinkElement } from "plugins/link/utils";
import { useElementMenuContext } from "plugins/elementMenu/useElementMenuPlugin";

const ElementMenu = () => {
  const { currentElementStateRef } = useElementMenuContext();
  const [node, setNode] = useState<Node | null>(null);
  const editor = useSlateStatic();

  useLayoutEffect(() => {
    // sync dom ref and slate node
    const node = currentElementStateRef
      ? toSlateNode(editor, currentElementStateRef)
      : null;

    setNode(node);
  }, [editor, currentElementStateRef]);

  if (!node || !currentElementStateRef) {
    return null;
  }

  return <div>{isLinkElement(node) && <LinkContextMenu element={node} />}</div>;
};

const toSlateNode = (editor: Editor, element: HTMLElement) => {
  try {
    return ReactEditor.toSlateNode(editor, element);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default ElementMenu;
