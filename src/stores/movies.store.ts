import { create } from "zustand";
import { IMovie } from "../interfaces/movie.interface";

interface IMovieStore {
  movies: IMovie[];
  setMovies: (movies: IMovie[]) => void;
  searchKey: string;
  setSearchKey: (key: string) => void;
  currentPage: number;
  incrementPage: () => void;
}

export const useMovieStore = create<IMovieStore>((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
  searchKey: "",
  setSearchKey: (key) => set({ searchKey: key }),
  currentPage: 1,
  incrementPage: () => set((prev) => ({ currentPage: prev.currentPage + 1 })),
}));
