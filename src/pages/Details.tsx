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
import { getMovieById } from "../api/movies.api";
import { IMovie } from "../interfaces/movie.interface";

function Details() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IMovie | null>(null);
  const [error, setError] = useState("");
  const releaseYear = new Date(data?.release_date ?? "")?.getFullYear();

  async function fetchMovie() {
    setLoading(true);
    try {
      const response = await getMovieById(id ?? "");
      setLoading(false);
      setData(response);
    } catch (error: any) {
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
              sx={{ width: "100%", height: 300 }}
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
              {releaseYear} | {data?.runtime}
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
