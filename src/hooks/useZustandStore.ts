import { useMemo } from "react";
import { UseBoundStore } from "zustand";
import { State, StoreApi } from "zustand/vanilla";

const useZustandStore = <TState extends State>(
  create: () => UseBoundStore<TState, StoreApi<TState>>,
  deps: any[]
) => {
  const useStore = useMemo(() => create(), deps);

  return { getState: useStore.getState, state: useStore() };
};

export default useZustandStore;
