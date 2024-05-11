import { create } from "zustand";

type GlobalLoadingState = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

export const useGlobalLoadingState = create<GlobalLoadingState>((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading: loading }),
}));
