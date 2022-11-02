import { createContext, useState, useEffect } from "react";
import { API } from "../api-service";
import { useCookies } from "react-cookie";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [movies, setMovies] = useState();
  const [moviesList, setMoviesList] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [token, setToken, deleteToken] = useCookies("token");
  const [favoriteMovies, setFavoriteMovies] = useState(false);
  useEffect(() => {
    async function fetchData() {
      if (token !== "") {
        const data = await API.getMovies(token.token).catch((err) =>
          console.log(err)
        );
        setMovies(data);
        setMoviesList(data);
        setToken(token);
        setLoadingData(false);
      }
    }
    fetchData();
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        movies,
        setMovies,
        loadingData,
        setLoadingData,
        token,
        setToken,
        deleteToken,
        moviesList,
        favoriteMovies,
        setFavoriteMovies,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
