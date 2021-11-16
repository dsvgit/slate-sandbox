import React, { useMemo } from "react";
import {
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createHeadingPlugin,
  createHistoryPlugin,
  createItalicPlugin,
  createParagraphPlugin,
  createPlateComponents,
  createPlateOptions,
  createReactPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
  createDeserializeHTMLPlugin,
  Plate,
  PlatePluginComponent,
} from "@udecode/plate";
import { Node, Editor } from "slate";

import createLinkPlugin from "plugins/link/createLinkPlugin";
import Link from "plugins/link/components/Link";
import useToolbarPlugin from "plugins/toolbar/useToolbarPlugin";
import { useSlateDebugValue } from "useSlateDebugValue";
import { useSlate } from "slate-react";

import "index.css";
import { Toolbar } from "plugins/toolbar/components/Toolbar";
import useElementMenuPlugin, {
  ElementContextMenuContextProvider,
} from "plugins/elementMenu/useElementMenuPlugin";
import ElementMenu from "plugins/elementMenu/components/ElementMenu";
import { ELEMENT_LINK } from "plugins/link/types";
import { createLinkElement } from "plugins/link/utils";
import useSlashMenuPlugin from "plugins/slashMenu/useSlashMenuPlugin";
import SlashMenu from "plugins/slashMenu/components/SlashMenu";

const initialValue: Node[] = [
  {
    type: "p",
    children: [
      {
        text: "first paragraph",
      },
    ],
  },
  {
    type: "p",
    children: [
      {
        text: "Google: ",
      },
      createLinkElement({ url: "https://google.com", text: "google" }),
      {
        text: " website",
      },
    ],
  },
  {
    type: "p",
    children: [
      {
        text: "Yandex: ",
      },
      createLinkElement({ url: "https://yandex.com", text: "yandex" }),
      {
        text: " website",
      },
    ],
  },
  {
    type: "p",
    children: [
      {
        text: "Here we have a ",
      },
      createLinkElement({ url: "https://yandex.com", text: "link" }),
      {
        text: ". Which is awesome",
      },
    ],
  },
];

const options = createPlateOptions();
const components = createPlateComponents({
  [ELEMENT_LINK]: Link as PlatePluginComponent,
});

const App = () => (
  <div>
    <AppEditor />
    <h4>test</h4>
    <div contentEditable={true} />
  </div>
);

export default App;

const AppEditor = () => {
  const [debugValue, setDebugValue] = useSlateDebugValue(initialValue);
  const { props: toolbarProps } = useToolbarPlugin();
  const { plugin: elementMenuPlugin, props: elementMenuProps } =
    useElementMenuPlugin();
  const { plugin: slashMenuPlugin, props: slashMenuProps } =
    useSlashMenuPlugin();

  const plugins = useMemo(() => {
    const _plugins = [
      // editor
      createReactPlugin(), // withReact
      createHistoryPlugin(), // withHistory

      // elements
      createParagraphPlugin(), // paragraph element
      createBlockquotePlugin(), // blockquote element
      createCodeBlockPlugin(), // code block element
      createHeadingPlugin(), // heading elements

      // marks
      createBoldPlugin(), // bold mark
      createItalicPlugin(), // italic mark
      createUnderlinePlugin(), // underline mark
      createStrikethroughPlugin(), // strikethrough mark
      createCodePlugin(), // code mark

      // custom
      createLinkPlugin(),

      elementMenuPlugin,
      slashMenuPlugin,
    ];

    _plugins.push(createDeserializeHTMLPlugin({ plugins: _plugins }));

    return _plugins;
  }, [elementMenuPlugin, slashMenuPlugin]);

  return (
    <ElementContextMenuContextProvider value={elementMenuProps}>
      <Plate
        initialValue={initialValue}
        plugins={plugins}
        options={options}
        components={components}
        onChange={(value) => setDebugValue(value)}
      >
        <div>
          <Toolbar {...toolbarProps} />
          <ElementMenu />
          <SlashMenu {...slashMenuProps} />
          <DebugComponent debugValue={debugValue} />
        </div>
      </Plate>
    </ElementContextMenuContextProvider>
  );
};

const DebugComponent = ({ debugValue }: { debugValue: any }) => {
  const editor = useSlate();

  return (
    <div>
      <pre>
        {JSON.stringify(editor.selection, null, 2)}
        <br />
        {debugValue}
      </pre>
    </div>
  );
};
