import { getNodeDeserializer, Deserialize } from "@udecode/plate";

import { ELEMENT_LINK } from "plugins/link/types";

export const getLinkDeserialize = (): Deserialize => (editor) => {
  return {
    element: getNodeDeserializer({
      type: ELEMENT_LINK,
      getNode: (el) => ({
        type: ELEMENT_LINK,
        url: el.getAttribute("href"),
      }),
      rules: [{ nodeNames: "A" }],
    }),
  };
};
