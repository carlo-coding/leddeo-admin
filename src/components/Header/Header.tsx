import { AppBar, Box, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../models";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticaed = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticaed) {
    return null;
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "layout.veryDarkGray",
      }}
    >
      <Box
        component="button"
        sx={{
          typography: "logo",
          padding: "0",
        }}
        onClick={() => navigate(`/${PrivateRoutes.PRIVATE}`)}
      >
        Administration
      </Box>

      <Box
        sx={{
          marginLeft: "auto",
          marginRight: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      ></Box>
    </AppBar>
  );
}
export default Header;
