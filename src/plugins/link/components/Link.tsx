import React from "react";
import { StyledElementProps } from "@udecode/plate";
import { useSelected } from "slate-react";
import cn from "classnames";

import styles from "./index.module.scss";

import { LinkNodeData } from "plugins/link/types";

const Link = (props: StyledElementProps<LinkNodeData>) => {
  const { children, element } = props;
  const { url } = element;

  const selected = useSelected();

  return (
    <a
      className={cn({
        [styles.selected]: selected,
      })}
      href={url}
      onMouseEnter={() => {}}
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
