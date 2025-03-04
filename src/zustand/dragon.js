import { create } from "zustand";

// ✅ 검색 관련 상태 관리 (기존 유지)
const useKakaoStore = create((set) => ({
  places: [],
  pagination: null,
  isLoading: false,
  error: null,
  keyword: "",
  userid: "",

  setPlaces: (places) => set({ places }),
  setPagination: (pagination) => set({ pagination }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setKeyword: (keyword) => set({ keyword }),
  setUserId: (userid) => set({userid}),
}));


export { useKakaoStore };