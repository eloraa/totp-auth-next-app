import { create, type StateCreator } from 'zustand';

interface AuthState {
  isGoogleSignInLoading: boolean;
  setGoogleSignInLoading: (loading: boolean) => void;
}

const createAuthStore: StateCreator<AuthState> = set => ({
  isGoogleSignInLoading: false,
  setGoogleSignInLoading: (loading: boolean) => set({ isGoogleSignInLoading: loading }),
});

export const useAuthStore = create<AuthState>()(createAuthStore);