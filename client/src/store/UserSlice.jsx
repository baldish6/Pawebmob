import { create } from 'zustand'

export const useUserStore = create((set) => ({
  currentUser: null,
  addUser: (loggedUser) => set({ currentUser: loggedUser }),
  logout:()=>set({currentUser:null})
}))