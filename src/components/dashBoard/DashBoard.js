import React from "react";
import { fetchSingers } from "../../actions";
import { getNamesOfAllSongs } from "../../actions";
import { connect } from "react-redux";
import SingerCard from "../singers/singerCard";
import Box from "@material-ui/core/Box";

class DashBoard extends React.Component {
  componentDidMount = async () => {
    await this.props.fetchSingers();
  };
  componentWillUnmount() {}
  makeCard = () => {
    const simer = this.props.singerNames.map((s, indx) => {
      return (
        <Box mb={4} key={indx}>
          {" "}
          <SingerCard key={indx} singerName={s} />
        </Box>
      );
    });
    return simer;
  };
  render() {
    return (
      <div>
        <div>
          <Box
            display="flex"
            flexDirection="row"
            p={1}
            m={1}
            justifyContent="space-between"
            flexWrap="wrap"
          >
            {this.makeCard()}
          </Box>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    singerNames: Object.values(state.singerRelatedData.singersNames),
    allSongsForOneSinger: state.singerRelatedData.songsForOneSinger,
  };
};
export default connect(mapStateToProps, { fetchSingers, getNamesOfAllSongs })(
  DashBoard
);
