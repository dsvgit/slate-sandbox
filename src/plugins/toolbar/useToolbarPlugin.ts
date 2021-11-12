import { ToolbarProps } from "plugins/toolbar/types";
import { HookPlugin } from "plugins/types";

const useToolbarPlugin: HookPlugin<ToolbarProps> = () => {
  return {
    plugin: {},
    props: {
      name: "test",
    },
  };
};

export default useToolbarPlugin;
