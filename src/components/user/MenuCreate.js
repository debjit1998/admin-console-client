import React, { useState, useEffect, useCallback } from "react";
import UserNav from "../nav/UserNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { getRestaurantsByHotel } from "../../functions/hotels";
import MenuCreateForm from "../forms/MenuCreateForm";
import { addMenuItem } from "../../functions/menu";
import { getAllBanners } from "../../functions/festivalbanner";
import { CreationPopupMessage } from "../utils/utils";

const initialState = {
  hotel_code: "",
  restaurant_id: "",
  title: "",
  description: "",
  item_ref_id: "",
  price: "",
  dish_type: "",
  dish_type_sequence: "",
  category: "",
  allergens: [],
  condiments: "",
  spice_level: "",
  portion: "",
  max_order_qty: "",
  jain_dish: "",
  halal_dish: "",
  signature_dish: "",
  container_type: "",
  veg_or_non_veg: "",
  prep_time_min: "",
  pdp_image_url: "",
  festival_ids:""
};

function MenuCreate({ history }) {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  const [banners, setBanners] = useState([])

  const { user } = useSelector((state) => ({ ...state }));
  const hotels = user.hotels;

  const loadAllBanners = useCallback(() => {
    getAllBanners(hotels, user.token)
      .then((res) => {
        setBanners(res.data);
      })
      .catch((err) => {
        setBanners([]);
        toast.error("Something went wrong in fetching the banners!");
      });
  }, [hotels, user.token]);

  useEffect(() => {
    loadAllBanners();
  }, [loadAllBanners]);


  const handleHotelChange = (e) => {
    setIsDirty(true);
    setShowRestaurants(false);
    if (e.target.value !== "Please select") {
      setRestaurantOptions([]);
      setLoading(true);
      getRestaurantsByHotel(e.target.value, user.token)
        .then((res) => {
          setValues({
            ...values,
            hotel_code: e.target.value,
            restaurant_id: "",
          });
          setRestaurantOptions(res.data);
          setShowRestaurants(true);
          setLoading(false);
          //console.log(values);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error("Something went wrong");
        });
    } else {
      setValues({
        ...values,
        hotel_code: "",
        restaurant_id: "",
      });
    }
  };

  const handleRestaurantChange = (e) => {
    setIsDirty(true);
    if (e.target.value !== "Please select") {
      console.log("restaurant selected!");
      setValues({ ...values, restaurant_id: e.target.value });
      console.log(e.target.value);
      //console.log(values);
    } else {
      setValues({ ...values, restaurant_id: "" });
    }
  };

  const handleChange = (e) => {
    setIsDirty(true);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleAllergenChange = (value) => {
    setValues({ ...values, allergens: value });
    setIsDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (values.hotel_code === "" || values.hotel_code === "Please select") {
      window.alert("Please select a hotel code");
      return;
    }
    if (
      values.restaurant_id === "" ||
      values.restaurant_id === "Please select"
    ) {
      window.alert("Please select a restaurant");
      return;
    }
    if (values.spice_level === "" || values.spice_level === "Please select") {
      window.alert("Please select the spice level");
      return;
    }
    if (values.portion === "" || values.portion === "Please select") {
      window.alert("Please select the portion");
      return;
    }
    if (values.jain_dish === "" || values.jain_dish === "Please select") {
      window.alert("Please select a jain_dish flag");
      return;
    }
    if (values.halal_dish === "" || values.halal_dish === "Please select") {
      window.alert("Please select a halal_dish flag");
      return;
    }
    if (
      values.signature_dish === "" ||
      values.signature_dish === "Please select"
    ) {
      window.alert("Please select a signature flag");
      return;
    }
    if (
      values.veg_or_non_veg === "" ||
      values.veg_or_non_veg === "Please select"
    ) {
      window.alert("Please select veg or non veg");
      return;
    }
    if (
      values.container_type === "" ||
      values.container_type === "Please select"
    ) {
      window.alert("Please select a conatiner type");
      return;
    }
    if (
      (values.jain_dish === "true" || values.jain_dish === true) &&
      values.veg_or_non_veg === "Non Veg"
    ) {
      window.alert("Jain dish cannot be true for Non Veg menu items");
      return;
    }
    if (
      (values.halal_dish === "true" || values.halal_dish === true) &&
      values.veg_or_non_veg === "Veg"
    ) {
      window.alert("Halal dish cannot be true for Veg menu items");
      return;
    }
    if (
      values.jain_dish.toString() === values.halal_dish.toString() &&
      values.jain_dish.toString() === "true"
    ) {
      window.alert("Menu item cannot be both Jain dish and Halal dish");
      return;
    }

    if (window.confirm(CreationPopupMessage(values))) {
      setLoading(true);
      addMenuItem(values, user.token)
        .then((res) => {
          setIsDirty(false);
          setLoading(false);
          console.log(res.data);
          toast.success(`${res.data.title} successfully added`);
          history.push("/user/menu");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          if (err.response.status === 400) {
            toast.error(err.response.data);
          } else {
            toast.error("Something went wrong");
          }
        });
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col-md-10" style={{ marginTop: "50px" }}>
            {loading ? (
              <LoadingOutlined className="text-danger h1" />
            ) : (
              <>
                <h4>Add New Menu Item</h4>
                <hr />
              </>
            )}
            <div className="form-group">
              <label>
                <b>
                  Hotel Code{" "}
                  <h5
                    style={{
                      display: "inline-block",
                      color: "red",
                      marginBottom: "0px",
                    }}
                  >
                    *
                  </h5>
                </b>
              </label>
              <select
                name="hotel_code"
                className="form-control"
                onChange={handleHotelChange}
                required
              >
                <option>Please select</option>
                {hotels.map((h) => (
                  <option value={h} key={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
            {showRestaurants && (
              <div className="form-group">
                <label>
                  <b>
                    Restaurant{" "}
                    <h5
                      style={{
                        display: "inline-block",
                        color: "red",
                        marginBottom: "0px",
                      }}
                    >
                      *
                    </h5>
                  </b>
                </label>
                <select
                  name="restaurants"
                  className="form-control"
                  onChange={handleRestaurantChange}
                  required
                >
                  <option>Please select</option>
                  {restaurantOptions.map((r) => (
                    <option value={r.id} key={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <MenuCreateForm
              handleChange={handleChange}
              values={values}
              setValues={setValues}
              handleSubmit={handleSubmit}
              loading={loading}
              handleAllergenChange={handleAllergenChange}
              banners={banners}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuCreate;
