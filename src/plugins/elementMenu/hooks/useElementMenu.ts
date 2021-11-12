import { useCallback, useEffect } from "react";
import { Range } from "slate";
import {
  useFocused,
  useSelected,
  RenderElementProps,
  useSlateStatic,
} from "slate-react";

import { useElementMenuContext } from "plugins/elementMenu/useElementMenuPlugin";

const useElementMenuHandlers = (
  attributes: RenderElementProps["attributes"]
) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  const { currentElementRef, openElementMenu, closeElementMenu } =
    useElementMenuContext();

  const isOpened = useCallback(
    () => attributes.ref.current === currentElementRef.current,
    [attributes.ref, currentElementRef]
  );

  const handleOpenElementMenu = useCallback(() => {
    if (attributes.ref.current) {
      openElementMenu(attributes.ref.current);
    }
  }, [openElementMenu, attributes.ref]);

  useEffect(() => {
    if (
      focused &&
      selected &&
      editor.selection &&
      Range.isCollapsed(editor.selection)
    ) {
      handleOpenElementMenu();
    }
  }, [selected, focused, handleOpenElementMenu]);

  useEffect(
    () => () => {
      isOpened() && closeElementMenu();
    },
    [closeElementMenu, isOpened]
  );

  return { handleOpenElementMenu };
};

export default useElementMenuHandlers;
