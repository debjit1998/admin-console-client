import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function UserNav() {
  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const handleAdminDashboard = () => {
    if (user.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      window.alert(
        "Sorry you have user role and don't have access to this page"
      );
      return;
    }
  };

  const handleOfferAdd = () => {
    if (user.role !== "admin") {
      window.alert(
        "Sorry you have user role and don't have access to this page"
      );
      return;
    }

    history.push("/user/offer/create");
  };

  const handleOffers = () => {
    if (user.role !== "admin") {
      window.alert(
        "Sorry you have user role and don't have access to this page"
      );
      return;
    }

    history.push("/user/offers");
  };

  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to="/user"
            className="list-group-item list-group-item-info list-group-item-action"
            style={{ color: "black", fontWeight: "bold" }}
          >
            Restaurants
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/user/restaurant/create"
            className="list-group-item list-group-item-info list-group-item-action"
            style={{ color: "black", fontWeight: "bold" }}
          >
            Add Restaurant
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/user/menu"
            className="list-group-item list-group-item-info list-group-item-action"
            style={{ color: "black", fontWeight: "bold" }}
          >
            Menu Items
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/user/menu/create"
            className="list-group-item list-group-item-info list-group-item-action"
            style={{ color: "black", fontWeight: "bold" }}
          >
            Add Menu Item
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="#"
            className="list-group-item list-group-item-info list-group-item-action"
            style={{ color: "black", fontWeight: "bold" }}
            onClick={handleOffers}
          >
            Offers
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="#"
            className="list-group-item list-group-item-info list-group-item-action"
            style={{ color: "black", fontWeight: "bold" }}
            onClick={handleOfferAdd}
          >
            Add Offer
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="#"
            className="list-group-item list-group-item-info list-group-item-action"
            style={{ color: "black", fontWeight: "bold" }}
            onClick={handleAdminDashboard}
          >
            Admin Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserNav;
