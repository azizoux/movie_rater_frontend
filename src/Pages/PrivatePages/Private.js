import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Outlet, useLocation, Navigate } from "react-router-dom";

export default function Private() {
  const { token } = useContext(UserContext);
  console.log("Private: ", token);

  if (token === "") {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
