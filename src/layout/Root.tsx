import { Home as HomeIcon } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import SearchBar from "../components/Search";
import { Outlet } from "react-router-dom";
import { useMovieStore } from "../stores/movies.store";
import { debounce } from "lodash";

function Root() {
  const { setSearchKey } = useMovieStore();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <SearchBar
              onSearchKeyChange={(key) =>
                debounce(() => {
                  setSearchKey(key);
                }, 1000)
              }
            />
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
