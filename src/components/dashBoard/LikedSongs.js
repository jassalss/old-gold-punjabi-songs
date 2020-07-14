import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import { fetchLikedSongs } from "../../actions";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function LikedSongList(props) {
  const classes = useStyles();
  const makeList = () => {
    console.log(props.likedSongs);
    return props.likedSongs.map((item) => {
      return (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <MusicNoteIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.songName} secondary={item.singerName} />
        </ListItem>
      );
    });
  };
  useEffect(() => {
    if (props.likedSongs.length === 0) {
      props.fetchLikedSongs();
    }
  });
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
      <h2>Liked Songs</h2>
      <List className={classes.root}>{makeList()}</List>
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    likedSongs: state.singerRelatedData.likedSongs,
  };
};
export default connect(mapStateToProps, { fetchLikedSongs })(LikedSongList);
