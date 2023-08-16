import { useEffect, useState } from "react";
import { useMovieStore } from "../stores/movies.store";
import { getMovies } from "../api/movies.api";

function List() {
  const [isLoading, setIsLoading] = useState(false);
  const { movies, setMovies, currentPage, incrementPage } = useMovieStore();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getMovies(currentPage);
      setMovies([...movies, ...data?.results]);
      incrementPage();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
      <div>List</div>
    </>
  );
}

export default List;
