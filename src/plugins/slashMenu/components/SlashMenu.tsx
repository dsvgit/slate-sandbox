import React from "react";

import { SlashMenuProps } from "plugins/slashMenu/types";
import RangePopper from "./RangePopper";

import styles from "./SlashMenu.module.scss";

const SlashMenu = ({ search, target }: SlashMenuProps) => {
  if (target == null) {
    return null;
  }

  return (
    <RangePopper isVisible={target != null} range={target}>
      <SlashMenuContent search={search} />
    </RangePopper>
  );
};

export default SlashMenu;

const SlashMenuContent = ({ search }: Partial<SlashMenuProps>) => {
  return (
    <div className={styles.container}>
      <div>Menu</div>
      Search: {search}
    </div>
  );
};
