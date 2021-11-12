import { PlatePlugin } from "@udecode/plate";

export type HookPlugin<T = undefined, O = {}> = (options?: O) => {
  plugin: PlatePlugin;
  props: T;
};
