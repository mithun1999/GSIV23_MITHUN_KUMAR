import { Home as HomeIcon } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { debounce } from "lodash";
import { Outlet } from "react-router-dom";
import SearchBar from "../components/Search";
import { useMovieStore } from "../stores/movies.store";

function Root() {
  const { setSearchKey, resetSearch } = useMovieStore();

  const handleSearchInput = debounce((key: string) => {
    resetSearch();
    setSearchKey(key);
  }, 300);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <SearchBar onSearchKeyChange={handleSearchInput} />
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box my={4} mx={3}>
        <Outlet />
      </Box>
    </div>
  );
}

export default Root;
