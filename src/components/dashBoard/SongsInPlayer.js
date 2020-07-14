import React, { Component } from "react";
import { connect } from "react-redux";
import { getNamesOfAllSongs } from "../../actions";
import { getSongs } from "../../actions";
import MusicPlayer from "../musicplayer/MusicPlayer";
import { Box } from "@material-ui/core";
class SongsInPlayer extends Component {
  componentDidMount = async () => {
    await this.props.getNamesOfAllSongs(this.props.match.params.singerName);

    await this.props.getSongs();
  };

  loadPlayerWithSongs = () => {
    var count = 0;
    return this.props.UrlsForOneSingerSongs.map((e, index) => {
      if (this.props.pathToSong[count]) {
        var songName = this.props.pathToSong[count].location.path.split("/")[1];
      } else {
        songName = "Song Name not available";
      }
      count += 1;
      const regex = /.mp3/gi;
      songName = songName.replace(regex, "");
      return (
        <MusicPlayer
          key={index}
          singerName={this.props.match.params.realName}
          theUrl={e}
          songName={songName}
        />
      );
    });
  };
  render() {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        {this.loadPlayerWithSongs()}
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pathToSong: state.singerRelatedData.songsPathForOneSinger,
    UrlsForOneSingerSongs: state.singerRelatedData.UrlsForSongs,
  };
};
export default connect(mapStateToProps, { getNamesOfAllSongs, getSongs })(
  SongsInPlayer
);
