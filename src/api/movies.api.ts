import { axiosInstance } from "../utils/axios.util";

export async function getMovies(page: number) {
  const { data } = await axiosInstance({
    method: "GET",
    url: `movie/upcoming?language=en-US&page=${page}`,
  });
  return data as any;
}

export async function searchMovies(query: string, page: number) {
  const { data } = await axiosInstance({
    method: "GET",
    url: `search/movie?query=${query}&language=en-US&page=${page}`,
  });
  return data as any;
}
