import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

function AdminRoute({ children, ...rest }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      if (user.role === "admin") {
        setOk(true);
      }
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
}

export default AdminRoute;
