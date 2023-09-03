import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const pages = ["Resume", " Cover Letter", "Interview Guide"];
const settings = ["Profile", "Account", "Logout"];

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(false);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row-reverse", md: "row" },
            alignItems: "center",
          }}
        >
          <Link to="/">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AdbIcon
                sx={{
                  display: "flex",
                  mr: 1,
                  ml: { xs: 1, md: 0 },
                  color: "white",
                }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: "flex",
                  fontFamily: "monospace",
                  fontSize: { xs: 18, md: 20, lg: 24 },
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                TAILOR
              </Typography>
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    fontSize={{ xs: 14, sm: 16, md: 18 }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Button
            key={"Resume"}
            onClick={() => {
              navigate("/resume");
              setAnchorElNav(null);
            }}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Resume
          </Button>

          <Button
            disabled
            key={"Cover Letter"}
            onClick={() => {
              navigate("/resume");
              setAnchorElNav(null);
            }}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Cover Letter
          </Button>

          <Button
            disabled
            key={"Interview"}
            onClick={() => {
              navigate("/resume");
              setAnchorElNav(null);
            }}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Interview
          </Button>
        </Box>

        {!auth ? (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box mr={2}>
              <Link to="/signIn">
                <Typography fontSize={{ xs: 14, sm: 16, md: 18 }} color="white">
                  Sign In
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link to="/signUp">
                {" "}
                <Typography fontSize={{ xs: 14, sm: 16, md: 18 }} color="white">
                  Sign Up
                </Typography>
              </Link>
            </Box>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Container>
    </AppBar>
  );
}
