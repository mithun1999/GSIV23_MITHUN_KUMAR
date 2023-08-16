import { useState } from "react";
import { getMovies } from "../api/movies.api";
import MovieGrid from "../components/MovieGrid";
import { useMovieStore } from "../stores/movies.store";

function MovieList() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { movies, setMovies, currentPage, incrementPage } = useMovieStore();

  const fetchData = async () => {
    if (hasMore) {
      setIsLoading(true);
      try {
        const data = await getMovies(currentPage);
        setMovies([...movies, ...data?.results]);
        incrementPage();
        if (currentPage + 1 >= data?.total_pages) setHasMore(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <MovieGrid
        data={movies}
        isLoading={isLoading}
        hasMore={hasMore}
        fetchData={fetchData}
      />
    </>
  );
}

export default MovieList;
