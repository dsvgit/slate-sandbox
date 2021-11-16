import React, { useEffect, useState } from "react";
import { Range } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import * as PopperJS from "@popperjs/core";
import { Modifier, usePopper } from "react-popper";
import cn from "classnames";

import PortalBody from "framework/components/PortalBody";

import styles from "./index.module.scss";

type RangePopperProps = {
  children: React.ReactNode;
  isVisible: boolean;
  range: Range | null;
  popperOptions?: Omit<Partial<PopperJS.Options>, "modifiers"> & {
    createPopper?: typeof PopperJS.createPopper;
    modifiers?: ReadonlyArray<Modifier<any, any>>;
  };
};

const RangePopper = ({
  isVisible,
  range,
  children,
  popperOptions = {},
}: RangePopperProps) => {
  const editor = useSlateStatic();
  const [referenceElement, setReferenceElement] =
    useState<globalThis.Range | null>();
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (range) {
      const domRange = ReactEditor.toDOMRange(editor, range);
      setReferenceElement(domRange);
    } else {
      setReferenceElement(null);
    }
  }, [editor, range]);

  const popper = usePopper(referenceElement, popperElement, {
    strategy: "fixed",
    ...popperOptions,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [60, 5],
        },
      },
      ...(popperOptions.modifiers || []),
    ],
  });

  return (
    <PortalBody>
      <div
        ref={setPopperElement}
        style={popper.styles.popper}
        {...popper.attributes.popper}
        className={cn(styles.rangePopper, {
          [styles.visible]: isVisible && referenceElement,
        })}
      >
        {children}
      </div>
    </PortalBody>
  );
};

export default RangePopper;
