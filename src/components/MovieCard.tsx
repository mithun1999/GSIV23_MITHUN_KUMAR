import { Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

interface IMovieCard {
  image: string;
  title: string;
  description: string;
  rating: number;
}

function MovieCard(props: IMovieCard) {
  return (
    <Card
      sx={{ minWidth: 345, maxWidth: 345, minHeight: 240, cursor: "pointer" }}
    >
      <CardMedia sx={{ width: "100%", height: 140 }} image={props.image} />
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography gutterBottom variant="h5" component="p" noWrap>
            {props.title}
          </Typography>
          <Typography gutterBottom variant="caption" component="span">
            {props.rating}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" noWrap>
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
