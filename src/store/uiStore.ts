import { create } from "zustand";

interface State {
  isSideMenuOpen: boolean;
}
interface Actions {
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

type UiStore = State & Actions;

export const useUiStore = create<UiStore>()((set, get) => ({
  isSideMenuOpen: false,
  closeSideMenu: () => {
    set({
      isSideMenuOpen: false,
    });
  },
  openSideMenu: () => {
    // set((state) => ({ isSideMenuOpen: true }));
    set({
      isSideMenuOpen: true,
    });
  },
}));
