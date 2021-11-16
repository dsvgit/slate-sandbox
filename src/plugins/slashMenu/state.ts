import { Range } from "slate";
import create from "zustand";

type SlashMenuState = {
  target: Range | null;
  search: string;

  openMenu: (target: Range | null) => void;
  closeMenu: () => void;
  setSearch: (search: string) => void;
};

const createState = () =>
  create<SlashMenuState>((set) => ({
    target: null,
    search: "",

    openMenu: (target: Range | null) => set({ target }),
    closeMenu: () => set({ target: null, search: "" }),
    setSearch: (search: string) => set(() => ({ search })),
  }));

export default createState;
