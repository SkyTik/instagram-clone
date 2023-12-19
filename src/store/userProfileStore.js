import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  useProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),
}));
export default useUserProfileStore;
