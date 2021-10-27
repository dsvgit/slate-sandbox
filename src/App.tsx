import React, { useState } from "react";
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
  Plate,
  PlatePluginComponent,
  TNode,
} from "@udecode/plate";
import createLinkPlugin from "plugins/link/createLinkPlugin";
import Link from "plugins/link/components/Link";
import { ELEMENT_LINK } from "plugins/link/defaults";
import useToolbarPlugin from "plugins/toolbar/useToolbarPlugin";
import { Toolbar } from "plugins/toolbar/components/Toolbar";

import "index.css";
import {useSlateDebugValue} from "useSlateDebugValue";

const initialValue: TNode[] = [
  {
    type: "p",
    children: [
      {
        text: "This is editable plain text with react and history plugins, just like a <textarea>!",
      },
    ],
  },
  {
    type: "p",
    children: [
      {
        text: "Here we have a ",
      },
      {
        type: "a",
        url: "https://google.com",
        children: [
          {
            text: "link",
          },
        ],
      },
      {
        text: ". Which is awesome",
      },
    ],
  },
];

const plugins = [
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
];

const options = createPlateOptions();
const components = createPlateComponents({
  [ELEMENT_LINK]: Link as PlatePluginComponent,
});

const Editor = () => {
  const [debugValue, setDebugValue] = useSlateDebugValue(initialValue);
  const { props: toolbarProps } = useToolbarPlugin();

  return (
    <Plate
      initialValue={initialValue}
      plugins={plugins}
      options={options}
      components={components}
      onChange={(value) => setDebugValue(value)}
    >
      {toolbarProps && <Toolbar {...toolbarProps} />}
      <div>
        <pre>{debugValue}</pre>
      </div>
    </Plate>
  );
};

const App = () => <Editor />;

export default App;
