import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, getMovieCastById } from "../api/movies.api";
import { IMovie, IMovieCredits } from "../interfaces/movie.interface";
import { toHoursAndMinutes } from "../utils/time.util";

function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IMovie | null>(null);
  const [creditData, setCreditData] = useState<IMovieCredits | null>(null);
  const [error, setError] = useState("");
  const releaseYear = new Date(data?.release_date ?? "")?.getFullYear();
  const formatedTime = toHoursAndMinutes(data?.runtime ?? 0);
  const director = creditData?.crew?.find((per) => per?.job === "Director");
  const cast = creditData?.crew?.map((c) => c?.name);

  async function fetchMovie() {
    setLoading(true);
    try {
      const movieDataPromise = getMovieById(id ?? "");
      const castDataPromise = getMovieCastById(id ?? "");
      const [movieData, castData] = await Promise.all([
        movieDataPromise,
        castDataPromise,
      ]);
      setLoading(false);
      setData(movieData);
      setCreditData(castData);
    } catch (error: any) {
      setLoading(false);
      setError(error?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <>
      {loading && (
        <Stack alignItems="center" mt={5}>
          <CircularProgress />
        </Stack>
      )}
      {error && !loading && (
        <Typography variant="h5" textAlign="center">
          {error}
        </Typography>
      )}
      {data && !loading && (
        <Card
          sx={{
            display: "flex",
            gap: 4,
            padding: "20px",
            flexWrap: { xs: "wrap", lg: "nowrap" },
          }}
        >
          <Box>
            <CardMedia
              component="img"
              sx={{ width: "100%", minWidth: 200, maxHeight: 300 }}
              image={
                data?.poster_path
                  ? `https://image.tmdb.org/t/p/original/${data?.poster_path}`
                  : `https://placehold.co/500`
              }
            />
          </Box>
          <Box>
            <Typography gutterBottom variant="h5" component="h5">
              {data?.title} ({data?.popularity})
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {releaseYear} | {formatedTime} | {director?.name}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              Cast: {cast?.toString()}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              Description: {data?.overview}
            </Typography>
          </Box>
        </Card>
      )}
    </>
  );
}

export default Details;
