import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../Components/MovieCard/MovieCard";
import { UserContext } from "../context/UserContext";

import "../App.sass";

export default function Home() {
  const { movies, token, loadingData, favoriteMovies, setFavoriteMovies } =
    useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token["token"]) {
      return navigate("/");
    }
  }, [token]);

  if (!loadingData) {
    return (
      <div className="App">
        {movies !== undefined && favoriteMovies === false
          ? movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          : null}
        {movies !== undefined && favoriteMovies === true
          ? movies.map((movie) => {
              if (movie.liked === true) {
                return <MovieCard key={movie.id} movie={movie} />;
              }
            })
          : null}
      </div>
    );
  } else {
    return null;
  }
}
