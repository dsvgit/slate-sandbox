import { FocusEvent, KeyboardEvent, useCallback, useMemo } from "react";
import { Editor, Range } from "slate";
import { OnChange, PlateEditor } from "@udecode/plate";
import isHotkey from "is-hotkey";

import { HookPlugin } from "plugins/types";
import { SlashMenuProps } from "plugins/slashMenu/types";
import { getAfterMatch, getBeforeText } from "plugins/slashMenu/queries";
import useZustandStore from "hooks/useZustandStore";
import createState from "plugins/slashMenu/state";

const useSlashMenuPlugin: HookPlugin<SlashMenuProps> = () => {
  const { state, getState } = useZustandStore(() => createState(), []);

  const onChange: OnChange = useCallback(
    (editor) => () => {
      const { target, setSearch, closeMenu } = getState();
      const { selection } = editor;

      if (target != null && selection && Range.isCollapsed(selection)) {
        const [start] = Range.edges(selection);

        const lastWord = getBeforeText(editor, start, { unit: "word" });
        // check if last symbol is slash and do nothing if so, because menu should be already opened by onKeyDown handler
        if (lastWord?.match(/(\s|^)\/$/)) {
          // prevent closing
          return;
        }

        const wordBefore = Editor.before(editor, start, { unit: "word" });
        const before =
          wordBefore && Editor.before(editor, wordBefore, { unit: "offset" });
        const beforeRange = before && Editor.range(editor, before, start);
        // extract search
        const beforeMatch =
          beforeRange && Editor.string(editor, beforeRange).match(/^\/(\w+)$/);

        // check if there is a space after selection or end
        const afterMatch = getAfterMatch(editor, start, /^(\s|$)/);

        console.log(beforeMatch, afterMatch);
        if (beforeMatch && afterMatch) {
          setSearch(beforeMatch[1]);
          return;
        }

        closeMenu();
      }
    },
    [getState]
  );

  const onKeyDown = useCallback(
    (editor: PlateEditor) => (e: KeyboardEvent) => {
      const { target, openMenu, closeMenu } = getState();
      const { selection } = editor;

      if (isHotkey("/", e) && selection) {
        // check if it is right block
        const blockEntry = Editor.above(editor, {
          mode: "lowest",
          match: (node) => {
            // @ts-ignore
            return Editor.isBlock(editor, node) && node.type === "p";
          },
        });

        // check if slash pressed not in inline
        const [inlinesMatch] = Editor.nodes(editor, {
          mode: "lowest",
          match: (node) => Editor.isInline(editor, node),
        });

        if (blockEntry && !inlinesMatch) {
          // open slash menu on slash pressed
          openMenu(selection);
        }
      }

      if (isHotkey("Escape", e) && target != null) {
        closeMenu();
      }
    },
    [getState]
  );

  const onBlur = useCallback(
    (editor: PlateEditor) => (e: FocusEvent) => {
      const { closeMenu } = getState();
      closeMenu();
    },
    [getState]
  );

  return {
    plugin: useMemo(
      () => ({
        onChange,
        onKeyDown,
        // onBlur,
      }),
      [onChange, onKeyDown]
    ),
    props: useMemo(
      () => ({
        search: state.search,
        target: state.target,
      }),
      [state.search, state.target]
    ),
  };
};

export default useSlashMenuPlugin;
