import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useUserStore = create()(
  persist(
    (set) => ({
  UserId: "",
  UserName: "",
  UserEmail:"",
  UserAvatar: "",
  setUserId: (UserId) => set(() => ({ UserId: UserId })),
  setUserName: (UserName) => set(()=>({UserName:UserName})),
  setUserAvatar: (UserAvatar) => set(()=>({UserAvatar:UserAvatar})),
  setUserEmail: (UserEmail) => set(()=>({UserEmail:UserEmail})),
  logout:()=>set({UserId:"",UserName: "",UserEmail:"",UserAvatar:""})
    }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)