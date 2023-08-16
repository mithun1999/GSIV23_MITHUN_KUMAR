import MovieList from "../sections/MovieList";
import SearchResult from "../sections/SearchResult";
import { useMovieStore } from "../stores/movies.store";

function List() {
  const { searchKey } = useMovieStore();

  return (
    <>
      <div>{searchKey ? <SearchResult /> : <MovieList />}</div>
    </>
  );
}

export default List;
