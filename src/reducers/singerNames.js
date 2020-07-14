import { FETCH_SINGERS_NAMES } from "../actions/types";
import { ALL_SONGS_FOR_SINGER } from "../actions/types";
import { ONE_SINGER_URL } from "../actions/types";
import { FETCH_LIKED_SONG } from "../actions/types";
const INTIAL_STATE = {
  singersNames: "",
  songsPathForOneSinger: [],
  UrlsForSongs: [],
  likedSongs: [],
};
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SINGERS_NAMES:
      return { ...state, singersNames: action.payload };
    case ALL_SONGS_FOR_SINGER:
      return { ...state, songsPathForOneSinger: action.payload };
    case ONE_SINGER_URL:
      return { ...state, UrlsForSongs: action.payload };
    case FETCH_LIKED_SONG:
      return {
        ...state,
        likedSongs: Object.values(action.payload),
      };
    default:
      return state;
  }
};
