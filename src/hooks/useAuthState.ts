import { create } from "zustand";

import { CurrentUser } from "../types/User";
import Repositories from "../repositories/repositories";

type AuthState = {
    user: CurrentUser | null;
    getAndSetUser: () => Promise<CurrentUser | null>;
    reset: () => void;
};

export const useAuthState = create<AuthState>((set) => ({
    user: null,
    reset: () => set({ user: null }),
    getAndSetUser: async () => {
        const user = await Repositories.userRepository.getCurrentUser();

        set({ user });
        return user;
    },
}));
