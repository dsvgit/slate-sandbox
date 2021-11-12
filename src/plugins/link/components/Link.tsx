import React from "react";
import { StyledElementProps } from "@udecode/plate";
import { useSelected } from "slate-react";
import cn from "classnames";

import { LinkNodeData } from "plugins/link/types";
import useElementMenuHandlers from "plugins/elementMenu/hooks/useElementMenu";

import styles from "./index.module.scss";

const Link = (props: StyledElementProps<LinkNodeData>) => {
  const { attributes, children, element } = props;
  const { url } = element;

  const selected = useSelected();
  const { handleOpenElementMenu } = useElementMenuHandlers(attributes);

  return (
    <a
      {...attributes}
      className={cn({
        [styles.selected]: selected,
      })}
      href={url}
      onMouseEnter={handleOpenElementMenu}
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
