import { useState } from "react";
import { searchMovies } from "../api/movies.api";
import MovieGrid from "../components/MovieGrid";
import { useMovieStore } from "../stores/movies.store";

function SearchResult() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    searchKey,
    incrementSearchPage,
    searchPage,
    searchResults,
    setSearchResults,
    hasMoreSearchResults,
    setHasMoreSearchResults,
  } = useMovieStore();

  const fetchData = async () => {
    if (hasMoreSearchResults) {
      setIsLoading(true);
      try {
        const data = await searchMovies(searchKey, searchPage);
        setSearchResults([...searchResults, ...data?.results]);
        incrementSearchPage();
        if (searchPage + 1 >= data?.total_pages) setHasMoreSearchResults(false);
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
        data={searchResults}
        isLoading={isLoading}
        hasMore={hasMoreSearchResults}
        fetchData={fetchData}
        key={searchKey}
      />
    </>
  );
}

export default SearchResult;
