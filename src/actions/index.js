import { singerNameRef } from "../firebaseConfig/firebase";
import { FETCH_SINGERS_NAMES } from "./types";
import { ALL_SONGS_FOR_SINGER } from "./types";
import { ONE_SINGER_URL } from "./types";
import { myStorage } from "../firebaseConfig/firebase";
import { firebasAuth } from "../firebaseConfig/firebase";
import { realTimeDB } from "../firebaseConfig/firebase";
import { USER_CREATED } from "./types";
import history from "../history";
import { CREATION_ERORR } from "./types";
import { RESET } from "./types";
import { CHECK_SINGED_IN } from "./types";
import { LOG_OUT } from "./types";
import { SAVED_SONG } from "./types";
import { SAVED_SONG_ERROR } from "./types";
import { LOG_OUT_ERROR, FETCH_LIKED_SONG } from "./types";
export const fetchSingers = () => async (dispatch) => {
  singerNameRef.on("value", (snapshot) => {
    dispatch({
      type: FETCH_SINGERS_NAMES,
      payload: snapshot.val(),
    });
  });
};
export const getNamesOfAllSongs = (singerName) => async (dispatch) => {
  var songList = [];
  var listRef = myStorage.ref(`${singerName}/`);
  songList = await (await listRef.listAll()).items;

  dispatch({ type: ALL_SONGS_FOR_SINGER, payload: songList });
};
export const getSongs = () => async (dispatch, getState) => {
  var songUrls = [];
  if (getState().singerRelatedData.songsPathForOneSinger) {
    var pathToSongs = getState().singerRelatedData.songsPathForOneSinger;
    songUrls = Promise.all(
      pathToSongs.map(async (path) => {
        path = path.location.path;
        const ref = myStorage.ref(path);
        return await ref.getDownloadURL();
      })
    );
  }
  dispatch({
    type: ONE_SINGER_URL,
    payload: await songUrls,
  });
};
export const createUser = (email, password, fullName) => async (dispatch) => {
  try {
    var user = await firebasAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    realTimeDB.ref(`users/${user.user.uid}`).set({
      fullName,
      email,
    });
    history.push("/");
    await dispatch({
      type: USER_CREATED,
      payload: user.user.uid,
    });
  } catch (e) {
    await dispatch({
      type: CREATION_ERORR,
      payload: e.message,
    });
  }
};
export const logIn = (email, password) => async (dispatch) => {
  try {
    var user = await firebasAuth.signInWithEmailAndPassword(email, password);
    history.push("/");
    dispatch({
      type: USER_CREATED,
      payload: user.user.uid,
    });
  } catch (e) {
    dispatch({
      type: CREATION_ERORR,
      payload: e.message,
    });
  }
};
export const resetState = () => {
  return {
    type: RESET,
  };
};
export const checkSignedIn = () => async (dispatch) => {
  var user = await firebasAuth.currentUser;
  if (user) {
    dispatch({
      type: CHECK_SINGED_IN,
      payload: user.uid,
    });
  } else {
    dispatch({
      type: CREATION_ERORR,
      payload: "",
    });
  }
};
export const logOut = () => async (dispatch) => {
  try {
    await firebasAuth.signOut();
    dispatch({
      type: LOG_OUT,
      payload: "",
    });
  } catch (e) {
    dispatch({
      type: LOG_OUT_ERROR,
      payload: e.message,
    });
  }
};

export const saveLikedSongs = (songName, singerName) => async (
  dispatch,
  getState
) => {
  var userId = getState().authInfo.userId;
  try {
    await realTimeDB.ref(`users/${userId}/likedSongs/${songName}`).set({
      songName,
      singerName,
    });
    dispatch({
      type: SAVED_SONG,
    });
  } catch (e) {
    dispatch({
      type: SAVED_SONG_ERROR,
    });
  }
};
export const fetchLikedSongs = () => async (dispatch, getState) => {
  var userId = getState().authInfo.userId;
  var likedSongRef = realTimeDB.ref(`users/${userId}/likedSongs`);
  likedSongRef.on("value", (snapshot) => {
    dispatch({
      type: FETCH_LIKED_SONG,
      payload: snapshot.val(),
    });
  });
};
