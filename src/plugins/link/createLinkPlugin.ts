import { getRenderElement, PlatePlugin } from "@udecode/plate";

import { ELEMENT_LINK } from "plugins/link/types";
import { withLink } from "plugins/link/withLink";
import { getLinkDeserialize } from "plugins/link/deserialize";

const createLinkPlugin = (): PlatePlugin => {
  return {
    inlineTypes: () => [ELEMENT_LINK],
    renderElement: getRenderElement(ELEMENT_LINK),
    withOverrides: (editor) => withLink(editor),
    deserialize: getLinkDeserialize(),
  };
};

export default createLinkPlugin;
