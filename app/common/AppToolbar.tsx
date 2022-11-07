import {
  AppBar,
  AppBarProps,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as NavLink, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CurrentUser } from "../core/auth.js";

type AppToolbarProps = AppBarProps;

export function AppToolbar(props: AppToolbarProps): JSX.Element {
  const { sx, ...other } = props;
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUser);

  return (
    <AppBar
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, ...sx }}
      color="default"
      elevation={1}
      {...other}
    >
      <Toolbar>
        {/* App name / logo */}

        <Typography variant="h1" sx={{ fontSize: "1.5rem", fontWeight: 500 }}>
          <Link color="inherit" underline="none" to="/" component={NavLink}>
            {APP_NAME}
          </Link>
        </Typography>

        <span style={{ flexGrow: 1 }} />

        {currentUser && (
          <>
            <IconButton size="medium">Rooms</IconButton>

            <IconButton size="medium">Users</IconButton>

            <IconButton size="medium">Friends</IconButton>

            <IconButton
              size="medium"
              onClick={() => {
                setCurrentUser("");
                navigate("/");
              }}
            >
              Logout
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
