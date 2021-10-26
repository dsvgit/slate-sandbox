import React from "react";
import { StyledElementProps } from "@udecode/plate";

import { LinkNodeData } from "plugins/link/types";

const Link = (props: StyledElementProps<LinkNodeData>) => {
  const { children, element } = props;
  const { url } = element;

  return (
    <a
      href={url}
      onMouseEnter={() => {

      }}
      onClick={(e) => {
        const linkElement = e.currentTarget;
        if (linkElement && e.metaKey) {
          const href = linkElement.href;
          window.open(href, "_blank");
        }
      }}
    >
      {children}
    </a>
  );
};

export default Link;