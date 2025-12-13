import type { User } from '~/types/user';
import { create } from 'zustand';

type State = {
  user: User;
};

type Action = {
  setUser: (newData: Partial<User | null>) => void;
  clearUser: () => void;
};

const userStore = create<State & Action>(set => ({
  user: {
    id: '',
    name: '',
    email: '',
    company_id: '',
    role: '',
  },

  setUser: newData =>
    set(state => ({
      user: { ...state.user, ...newData },
    })),

  clearUser: () => set({ user: { id: '', name: '', company_id: '', email: '', role: '' } }),
}));

export const useUser = () => userStore(state => state.user);
export const useSetUser = () => userStore(state => state.setUser);
export const useClearUser = () => userStore(state => state.clearUser);

export default userStore;
