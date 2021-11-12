import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Editor, Range } from "slate";

import { HookPlugin } from "plugins/types";
import { ElementMenuProps } from "plugins/elementMenu/types";
import { isLinkElement } from "plugins/link/utils";

type ElementMenuContextValue = ElementMenuProps;
const ElementMenuContext = createContext<ElementMenuContextValue>({
  currentElementRef: { current: null },
  currentElementStateRef: null,
  openElementMenu: () => {},
  closeElementMenu: () => {},
});
export const useElementMenuContext = () => useContext(ElementMenuContext);
export const ElementContextMenuContextProvider = ElementMenuContext.Provider;

const useElementMenuPlugin: HookPlugin<ElementMenuProps> = () => {
  const currentElementRef = useRef<HTMLElement | null>(null);
  const [currentElementStateRef, setCurrentElementStateRef] =
    useState<HTMLElement | null>(null);

  const openElementMenu = useCallback(
    (ref: HTMLElement | null) => {
      currentElementRef.current = ref;
      setCurrentElementStateRef(ref);
    },
    [setCurrentElementStateRef]
  );

  const closeElementMenu = useCallback(() => {
    currentElementRef.current = null;
    setCurrentElementStateRef(null);
  }, [setCurrentElementStateRef]);

  return {
    plugin: useMemo(
      () => ({
        onBlur: (editor) => (e) => {
          // closeElementMenu();
        },
        onSelect: (_editor) => () => {
          const editor = _editor as Editor;

          if (!editor.selection) {
            closeElementMenu();
            return;
          }

          if (Range.isExpanded(editor.selection)) {
            closeElementMenu();
            return;
          }

          const [entry] = Array.from(
            Editor.nodes(editor, { match: (node) => isLinkElement(node) })
          );

          if (!entry) {
            closeElementMenu();
          }
        },
      }),
      []
    ),
    props: useMemo(
      () => ({
        currentElementRef,
        currentElementStateRef,
        openElementMenu,
        closeElementMenu,
      }),
      [
        currentElementRef,
        currentElementStateRef,
        openElementMenu,
        closeElementMenu,
      ]
    ),
  };
};

export default useElementMenuPlugin;
