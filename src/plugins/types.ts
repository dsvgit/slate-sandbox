import { PlatePlugin } from "@udecode/plate";

export type HookPlugin<T, O = {}> = (options?: O) => {
  plugin?: PlatePlugin;
  props?: T;
};
