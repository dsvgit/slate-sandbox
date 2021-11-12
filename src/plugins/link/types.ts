import { BaseElement } from "slate";

export const ELEMENT_LINK = "a";

export type LinkElement = BaseElement & {
  type: "a";
  url: string;
};

export interface LinkNodeData {
  url: string;
}
