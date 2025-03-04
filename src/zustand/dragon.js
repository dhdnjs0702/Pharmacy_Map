import { create } from "zustand";

const useKakaoStore = create((set) => {
  return {
    places: [],
    pagination: null,
    isLoading: false,
    error: null,

    setPlaces: (places) => set({ places }),
    setPagination: (pagination) => set({ pagination }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
  };
});

export { useKakaoStore };
