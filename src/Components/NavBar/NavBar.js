import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LoginIcon from "@mui/icons-material/Login";
import LockIcon from "@mui/icons-material/Lock";
import Favorite from "@mui/icons-material/Favorite";
import "./NavBar.sass";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function NavBar() {
  const {
    setMovies,
    moviesList,
    deleteToken,
    favoriteMovies,
    setFavoriteMovies,
  } = useContext(UserContext);
  const [overLogin, setOverLogin] = useState(false);
  const [overLogOut, setOverLogOut] = useState(false);
  const navigate = useNavigate();
  const handleSearch = (critere) => {
    if (critere.trim() === "") {
      setMovies(moviesList);
    } else {
      setMovies(
        moviesList.filter((movie) =>
          movie.title.toLowerCase().startsWith(critere.toLowerCase())
        )
      );
    }
  };

  const handleFavorite = () => {
    if (!favoriteMovies === true) {
      setMovies(moviesList.filter((movie) => movie.liked === true));
    } else {
      setMovies(moviesList);
    }
    setFavoriteMovies(!favoriteMovies);
  };

  const logoutUser = () => {
    deleteToken(["token"]);
    return navigate("/");
  };
  return (
    <div className="NavBar">
      <h1 style={{ marginLeft: "10px" }}>Movies Rater</h1>
      <div
        style={{ marginRight: "10px", display: "flex", alignItems: "center" }}
      >
        <div>
          <Checkbox
            checked={favoriteMovies}
            style={{ marginRight: "40px" }}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            onClick={handleFavorite}
          />
        </div>
        <div>
          <Link to="/">
            <LoginIcon
              style={{ marginRight: "10px", cursor: "pointer" }}
              color={overLogin ? "primary" : "action"}
              onMouseOver={(e) => setOverLogin(true)}
              onMouseOut={(e) => setOverLogin(false)}
            />
          </Link>
          <ManageAccountsIcon
            style={{ marginRight: "10px", cursor: "pointer" }}
            color="action"
          />
          <LockIcon
            style={{ marginRight: "10px", cursor: "pointer" }}
            color={overLogOut ? "primary" : "action"}
            onMouseOver={(e) => setOverLogOut(true)}
            onMouseOut={(e) => setOverLogOut(false)}
            onClick={logoutUser}
          />
          <input
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  );
}
