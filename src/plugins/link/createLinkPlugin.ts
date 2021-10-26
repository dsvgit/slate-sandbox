import { getRenderElement, PlatePlugin } from "@udecode/plate";

import { ELEMENT_LINK } from "plugins/link/defaults";
import { withLink } from "plugins/link/withLink";

const createLinkPlugin = (): PlatePlugin => {
  return {
    inlineTypes: () => [ELEMENT_LINK],
    renderElement: getRenderElement(ELEMENT_LINK),
    withOverrides: withLink(),
  };
};

export default createLinkPlugin;
