import { create } from "zustand";
import { IMovie } from "../interfaces/movie.interface";

interface IMovieStore {
  movies: IMovie[];
  setMovies: (movies: IMovie[]) => void;
  searchResults: IMovie[];
  setSearchResults: (movies: IMovie[]) => void;
  searchKey: string;
  setSearchKey: (key: string) => void;
  currentPage: number;
  incrementPage: () => void;
  searchPage: number;
  incrementSearchPage: () => void;
  resetSearch: () => void;
  hasMoreSearchResults: boolean;
  setHasMoreSearchResults: (value: boolean) => void;
}

export const useMovieStore = create<IMovieStore>((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
  searchResults: [],
  setSearchResults: (movies) => set({ searchResults: movies }),
  searchKey: "",
  setSearchKey: (key) => set({ searchKey: key }),
  currentPage: 1,
  incrementPage: () => {
    set((prev) => ({ currentPage: prev.currentPage + 1 }));
  },
  searchPage: 1,
  incrementSearchPage: () =>
    set((prev) => ({ searchPage: prev.searchPage + 1 })),
  resetSearch: () =>
    set({ searchResults: [], searchPage: 1, hasMoreSearchResults: true }),
  hasMoreSearchResults: true,
  setHasMoreSearchResults: (value) => set({ hasMoreSearchResults: value }),
}));
