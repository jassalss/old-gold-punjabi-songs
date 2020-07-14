import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../allCss/my-style.css";
import Box from "@material-ui/core/Box";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { saveLikedSongs } from "../../actions";
import { connect } from "react-redux";
import $ from "jquery";
class MusicPlayer extends React.Component {
  render() {
    return (
      <div className="myPlayer">
        <DeepChild
          singerName={this.props.singerName}
          theUrl={this.props.theUrl}
          songName={this.props.songName}
          methodToStop={this.props.methodToStop}
          saveLikedSongs={this.props.saveLikedSongs}
        />
      </div>
    );
  }
}
const DeepChild = (props) => {
  const [moveUp, setIsOnline] = useState(
    Math.floor(Math.random() * Math.floor(100))
  );
  const useStyles = makeStyles((theme) => ({
    root: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      [theme.breakpoints.down("sm")]: {
        height: 200,
      },
      border: 0,
      fontSize: 16,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 80,
      padding: "0 0px",
    },
    myButton: {
      color: "white",
      fontSize: "large",
    },
  }));
  useEffect(() => {
    $("audio").on("play", function (me) {
      $("audio").each(function (i, e) {
        if (e !== me.currentTarget) {
          this.pause();
        }
      });
    });
  });
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="row"
      p={1}
      m={1}
      className={classes.root}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box display="flex">
        <Button className={classes.myButton}>{moveUp}</Button>
        <IconButton
          aria-label="upload picture"
          component="span"
          onClick={() => {
            setIsOnline(moveUp + 1);
            props.saveLikedSongs(props.songName, props.singerName);
          }}
        >
          <ThumbUpIcon fontSize="large" style={{ color: "white" }} />
        </IconButton>
      </Box>

      <Box flex-direction="column">
        <Box px={4}>
          <p>{`Singer: ${props.singerName}`}</p>
        </Box>
        <Box px={4}>
          <p>{`Song: ${props.songName}`}</p>
        </Box>
      </Box>
      <audio className={`songPlayer`} src={props.theUrl} controls />
    </Box>
  );
};
export default connect(null, {
  saveLikedSongs,
})(MusicPlayer);
