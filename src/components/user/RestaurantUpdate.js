import React, { useEffect, useState } from "react";
import UserNav from "../nav/UserNav";
import { getRestaurant } from "../../functions/hotels";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateRestaurant } from "../../functions/hotels";
import { Prompt } from "react-router-dom";
import RestaurantUpdateForm from "../forms/RestaurantUpdateForm";
import { UpdationPopupMessage } from "../utils/utils";

const initialState = {
  name: "",
  description: "",
  average_price_for_2_people: "",
  category: "",
  theme: "",
  available: "",
  home_page_card_img_url: "",
  restaurant_details_img_url: "",
  lunch_slot_open: "",
  lunch_slot_close: "",
  dinner_slot_open: "",
  dinner_slot_close: "",
};

function RestaurantUpdate({ match, history }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [restaurant, setRestaurant] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [inputChange, setInputChange] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRestaurant(match.params.id, user.token)
      .then((res) => {
        setLoading(false);
        //console.log(res.data);
        setRestaurant({
          ...restaurant,
          ...res.data,
          lunch_slot_open: res.data.slot1_lunch.open_time,
          lunch_slot_close: res.data.slot1_lunch.close_time,
          dinner_slot_open: res.data.slot3_dinner.open_time,
          dinner_slot_close: res.data.slot3_dinner.close_time,
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Something went wrong");
      });
  }, [user.token, match.params.id]);

  const handleChange = (e) => {
    setInputChange(true);
    setIsDirty(true);
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(restaurant);
    if (
      restaurant.available === "" ||
      restaurant.available === "Please select"
    ) {
      window.alert("Please select a hotel code");
      return;
    }
    if (restaurant.category === "" || restaurant.category === "Please select") {
      window.alert("Please select a category");
      return;
    }
    if (!restaurant.lunch_slot_open.match(/^[0-9][0-9]:[0-9][0-9] [A|P]M$/)) {
      window.alert(
        "Lunch slot open format is incorrect. Please follow the format shown in the example"
      );
      return;
    }
    if (!restaurant.lunch_slot_close.match(/^[0-9][0-9]:[0-9][0-9] [A|P]M$/)) {
      window.alert(
        "Lunch slot close format is incorrect. Please follow the format shown in the example"
      );
      return;
    }
    if (
      !restaurant.dinner_slot_open.match(/^[0-9][0-9]:[0-9][0-9] [A|P]M$/) &&
      !restaurant.dinner_slot_open === ""
    ) {
      window.alert(
        "Dinner slot open format is incorrect. Please follow the format shown in the example"
      );
      return;
    }
    if (
      !restaurant.dinner_slot_close.match(/^[0-9][0-9]:[0-9][0-9] [A|P]M$/) &&
      !restaurant.dinner_slot_close === ""
    ) {
      window.alert(
        "Dinner slot close format is incorrect. Please follow the format shown in the example"
      );
      return;
    }

    if (
      window.confirm(
        UpdationPopupMessage(restaurant, Object.keys(initialState))
      )
    ) {
      setLoading(true);
      updateRestaurant(restaurant.id, restaurant, user.token)
        .then((res) => {
          setIsDirty(false);
          console.log(res.data);
          setLoading(false);
          toast.success(`${res.data.name} updated`);
          history.push("/");
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
            <RestaurantUpdateForm
              loading={loading}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              values={restaurant}
              inputChange={inputChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantUpdate;
