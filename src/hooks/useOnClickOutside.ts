import { MutableRefObject, useEffect } from "react";

function useOnClickOutside(
  refs:
    | MutableRefObject<HTMLElement | null>
    | MutableRefObject<HTMLElement | null>[],
  handler: (event: Event) => void
) {
  const refsArray = Array.isArray(refs) ? refs : [refs];

  useEffect(() => {
    const listener: EventListener = (event) => {
      for (let ref of refsArray) {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [...refsArray, handler]);
}

export default useOnClickOutside;
