import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/*
export const useUserStore = create((set) => ({
  UserId: "",
  UserName: "",
  setUserId: (UserId) => set(() => ({ UserId: UserId })),
  setUserName: (UserName) => set(()=>({UserName:UserName})),
  logout:()=>set({UserId:"",UserName: ""})
}))
*/

export const useUserStore = create()(
  persist(
    (set) => ({
      UserId: "",
  UserName: "",
  UserAvatar: "",
  setUserId: (UserId) => set(() => ({ UserId: UserId })),
  setUserName: (UserName) => set(()=>({UserName:UserName})),
  setUserAvatar: (UserAvatar) => set(()=>({UserAvatar:UserAvatar})),
  logout:()=>set({UserId:"",UserName: "",UserAvatar:""})
    }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)