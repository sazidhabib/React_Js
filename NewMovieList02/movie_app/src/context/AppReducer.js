const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLATER":
      return {
        ...state,
        watchlater: [action.payload, ...state.watchlater],
      };
    case "REMOVE_MOVIE_FROM_WATCHLATER":
      return {
        ...state,
        watchlater: state.watchlater.filter(
          (movie) => movie.id !== action.payload
        ),
      };
    case "ADD_MOVIE_TO_WATCHED":
      return {
        ...state,
        watchlater: state.watchlater.filter(
          (movie) => movie.id !== action.payload.id
        ),
        watched: [action.payload, ...state.watched],
      };
    case "MOVE_TO_WATCHLATER":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.id !== action.payload.id
        ),
        watchlater: [action.payload, ...state.watchlater],
      };
    case "REMOVE_MOVIE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter((movie) => movie.id !== action.payload),
      };
    default:
      return state;
  }
};
export default AppReducer;
