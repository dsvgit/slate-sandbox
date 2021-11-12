import { Descendant, Element } from "slate";

import { ELEMENT_LINK, LinkElement } from "plugins/link/types";

export const createLinkElement = ({
  url,
  text,
  children = [],
}: {
  url: string;
  text?: string;
  children?: Descendant[];
}): LinkElement => {
  if (text) {
    children = [{ text }];
  }

  return { type: ELEMENT_LINK, url, children };
};

export const isLinkElement = (value: any): value is LinkElement => {
  return Element.isElementType<LinkElement>(value, "a");
};
