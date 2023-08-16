import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getMovies } from "../api/movies.api";
import MovieCard from "../components/MovieCard";
import { useMovieStore } from "../stores/movies.store";

function List() {
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

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  console.log(movies);

  return (
    <>
      <div>
        <Grid container spacing={4} justifyContent="space-around">
          {movies?.map((movie) => (
            <Grid item key={movie?.id}>
              <MovieCard
                title={movie?.title}
                rating={movie?.popularity}
                image={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                description={movie?.overview}
              />
            </Grid>
          ))}
        </Grid>
        {isLoading && (
          <Stack alignItems="center" mt={5}>
            <CircularProgress />
          </Stack>
        )}
        {!hasMore && (
          <Typography variant="h5" textAlign="center">
            End of list
          </Typography>
        )}
      </div>
    </>
  );
}

export default List;
