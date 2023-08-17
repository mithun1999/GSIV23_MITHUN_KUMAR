import { Home as HomeIcon } from "@mui/icons-material";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { debounce } from "lodash";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/Search";
import { useMovieStore } from "../stores/movies.store";

function Root() {
  const { setSearchKey, resetSearch } = useMovieStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchInput = debounce((key: string) => {
    resetSearch();
    setSearchKey(key);
  }, 300);

  const routeMapper: any = {
    "/details": (
      <Typography gutterBottom variant="h5" component="h5">
        Movie Details
      </Typography>
    ),
    "/": <SearchBar onSearchKeyChange={handleSearchInput} />,
  };

  const renderHeader = () => {
    const keys = Object.keys(routeMapper);
    const ele = keys.find((k) => location.pathname.includes(k));
    if (ele) return routeMapper[ele];
    return null;
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {renderHeader()}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => navigate("/")}
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
