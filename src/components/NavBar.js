import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { checkSignedIn, logOut } from "../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    if (!props.checkForSignedIn) {
      alert("Pleasr sign in to use this feature ");
    }
  };
  useEffect(() => {
    props.checkSignedIn();
  });
  const logMeOut = () => {
    props.logOut();
  };
  const open = Boolean(anchorEl);
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <MusicNoteIcon
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></MusicNoteIcon>
          <Typography variant="h6" className={classes.title}>
            Old Gold Punjabi Songs
          </Typography>
          {props.checkForSignedIn ? (
            <Button color="inherit" onClick={logMeOut}>
              LogOut
            </Button>
          ) : (
            <Button color="inherit" component={RouterLink} to="/logIn">
              login
            </Button>
          )}

          {props.checkForSignedIn ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/likedSong"
                >
                  Liked Songs
                </MenuItem>
              </Menu>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    checkForSignedIn: state.authInfo.isSigned,
  };
};
export default connect(mapStateToProps, {
  checkSignedIn,
  logOut,
})(NavBar);
