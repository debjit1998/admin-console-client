import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "../firebase";
import Header from "./nav/Header";
import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
import { currentUser } from "../functions/auth";
import UserRoute from "../routes/UserRoute";
import Restaurants from "./user/Restaurants";
import RestaurantCreate from "./user/RestaurantCreate";
import RestaurantUpdate from "./user/RestaurantUpdate";
import Password from "./user/Password";
import Menu from "./user/Menu";
import MenuCreate from "./user/MenuCreate";
import MenuUpdate from "./user/MenuUpdate";
import Offers from "./user/Offers";
import OfferCreate from "./user/OfferCreate";
import OfferUpdate from "./user/OfferUpdate";
import AdminRoute from "../routes/AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";
import FestiveBannerCreate from "./user/FestiveBannerCreate"

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setLoading(true);
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            setLoading(false);
            console.log(res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: user.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
                hotels: res.data.hotels,
              },
            });
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      }
    });

    return unsubscribe;
  }, [dispatch]);
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => {
            return <Login {...props} checking={loading} />;
          }}
        />
        <Route path="/forgot/password" exact component={ForgotPassword} />
        <UserRoute path="/user" exact component={Restaurants} />
        <UserRoute
          path="/user/restaurant/create"
          exact
          component={RestaurantCreate}
        />
        <UserRoute
          path="/user/restaurant/:id"
          exact
          component={RestaurantUpdate}
        />
        <UserRoute path="/user/password" exact component={Password} />
        <UserRoute path="/user/menu" exact component={Menu} />
        <UserRoute path="/user/menu/create" exact component={MenuCreate} />
        <UserRoute path="/user/menu/update/:id" exact component={MenuUpdate} />
        <UserRoute path="/user/festivebanner" exact component={FestiveBannerCreate} />
        <UserRoute path="/user/offers" exact component={Offers} />
        <UserRoute path="/user/offer/create" exact component={OfferCreate} />
        <UserRoute
          path="/user/offer/update/:id"
          exact
          component={OfferUpdate}
        />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
      </Switch>
    </>
  );
}

export default App;
