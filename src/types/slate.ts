import {
  BaseEditor,
  BaseElement,
  BaseText,
} from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

import { LinkElement } from "plugins/link/types";

export type ParagraphElement = BaseElement & {
  type: "p";
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: ParagraphElement | LinkElement | BaseElement;
    Text: BaseText;
  }
}
