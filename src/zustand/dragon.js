import { create } from "zustand";
//예시 코드입니다
const useUserStore = create((set) => {
  return {
    isLoginMode: true,
    setIsLoginMode: (mode) => {
      return set({ isLoginMode: mode });
    },
  };
});

export { useUserStore }; //스토어 생성하시고 여기에 export해주시면 됩니다.
