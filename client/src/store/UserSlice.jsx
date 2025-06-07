import { create } from 'zustand'

export const useUserStore = create((set) => ({
  UserId: "",
  UserName: "",
  setUserId: (UserId) => set(() => ({ UserId: UserId })),
  setUserName: (UserName) => set(()=>({UserName:UserName})),
  logout:()=>set({UserId:"",UserName: ""})
}))