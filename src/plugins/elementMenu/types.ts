import { MutableRefObject } from "react";

export type ElementMenuProps = {
  currentElementRef: MutableRefObject<HTMLElement | null>;
  currentElementStateRef: HTMLElement | null;
  openElementMenu: (ref: HTMLElement | null) => void;
  closeElementMenu: () => void;
};
