import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/UserContext";
import { variables } from "../../Variables";
import "./MovieCard.sass";

export default function MovieCard(props) {
  const [liked, setLiked] = useState(props.movie.liked);
  const [token, setToken, deleteToken] = useCookies("token");
  const { setMovies, moviesList, favoriteMovies } = useContext(UserContext);
  const dispatch = useDispatch();
  const toggleFavorite = (movie) => {
    const newMovie = { ...movie, liked: !liked };
    const index = moviesList.findIndex((mov) => mov.id === movie.id);
    moviesList.splice(index, 1, newMovie);
    if (favoriteMovies === true) {
      setMovies(moviesList.filter((mov) => mov.liked === true));
    } else {
      setMovies(moviesList);
    }
    setLiked(!liked);
    dispatch({
      type: "TOGGLE_LIKE",
      payload: {
        movie: movie,
        token: token.token,
      },
    });
  };

  return (
    <div>
      <div className="movieCardContainer" style={{ position: "relative" }}>
        <FavoriteIcon
          style={{ position: "absolute", right: "10px", cursor: "pointer" }}
          color={liked === true ? "secondary" : "disabled"}
          className="favoriteIcon"
          onClick={() => toggleFavorite(props.movie)}
        />

        <div className="movieCard">
          <img
            className="movieImage"
            src={variables.PHOTO_URL + props.movie.image}
            alt="MovieImage"
          />
          <h1 className="movieName">{props.movie.title}</h1>
          <div className="separator" />
          <div>
            <p>{props.movie.description}</p>
          </div>
          <div>
            <StarIcon
              color={props.movie.avg_ratings > 0 ? "secondary" : "disabled"}
            />
            <StarIcon
              color={props.movie.avg_ratings > 1 ? "secondary" : "disabled"}
            />
            <StarIcon
              color={props.movie.avg_ratings > 2 ? "secondary" : "disabled"}
            />
            <StarIcon
              color={props.movie.avg_ratings > 3 ? "secondary" : "disabled"}
            />
            <StarIcon
              color={props.movie.avg_ratings > 4 ? "secondary" : "disabled"}
            />
            ({props.movie.nb_of_ratings})
          </div>
        </div>
      </div>
    </div>
  );
}
