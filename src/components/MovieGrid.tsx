import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { IMovie } from "../interfaces/movie.interface";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";

interface IMovieGrid {
  data: IMovie[];
  isLoading: boolean;
  hasMore: boolean;
  fetchData: () => void;
  key?: string;
}

function MovieGrid(props: IMovieGrid) {
  const observerTarget = useRef(null);
  const { data, fetchData, hasMore, isLoading, key } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, isLoading, key]);

  return (
    <div>
      <Grid container spacing={4} justifyContent="space-around">
        {data?.map((movie) => (
          <Grid
            item
            key={movie?.id}
            onClick={() => {
              navigate(`/details/${movie.id}`);
            }}
          >
            <MovieCard
              title={movie?.title}
              rating={movie?.popularity}
              image={
                movie?.poster_path
                  ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
                  : `https://placehold.co/400`
              }
              description={movie?.overview ?? "No description found"}
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
      <div ref={observerTarget}></div>
    </div>
  );
}

export default MovieGrid;
