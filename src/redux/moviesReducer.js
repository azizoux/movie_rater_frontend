import { API } from "../api-service";

const INITIAL_STATE = {
  movies: [],
};

export default async function moviesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "TOGGLE_LIKE": {
      const movieToLike = {
        ...action.payload.movie,
        liked: !action.payload.movie.liked,
      };
      const movie = await API.updateMovie(
        action.payload.movie.id,
        movieToLike,
        action.payload.token
      );
      const listMovies = await API.getMovies(action.payload.token);
      return {
        movies: listMovies,
      };
    }
    case "GET_FAVORITE_MOVIES": {
      const listMovies = await API.getFavoriteMovies(action.payload.token);
      console.log("GET_FAVORITE_MOVIES", listMovies);
      return {
        movies: listMovies,
      };
    }
    case "INIT_STATE": {
      const listMovies = [...action.payload.movies];
      console.log("GET_ALL_MOVIES", listMovies);
      return {
        movies: listMovies,
      };
    }
  }
  return state;
}
