import React, { useState, useEffect, useCallback, useContext } from "react";
import UserNav from "../nav/UserNav";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import LocalSearch from "../forms/LocalSearch";
import { getRestaurantsByHotel } from "../../functions/hotels";
import { createBanner, getAllBanners } from "../../functions/festivalbanner";
import FestiveBanners from "./FestiveBanners";
import { Select } from "antd";
import { toast } from "react-toastify";
import SpinnerModalContext from "../../contexts/SpinnerModalContext";

const { Option } = Select;

const initialValues = {
  hotel_code: "",
  festival_name: "",
  start_date: "",
  end_date: "",
  restaurantArr: [],
  banner_url: "",
  festival_description: "",
};

function FestiveBannerCreate() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [banners, setBanners] = useState([]);
  const [keyword, setKeyword] = useState("");
  const { showSpinnerModal, hideSpinnerModal } = useContext(
    SpinnerModalContext
  );

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
    console.log(JSON.stringify(values, null, 2));

    if (e.target.value !== "Please select") {
      setLoading(true);
      setRestaurantOptions([]);
      getRestaurantsByHotel(e.target.value, user.token)
        .then((res) => {
          setRestaurantOptions(res.data);
          setLoading(false);
          setValues({
            ...values,
            restaurantArr: [],
            hotel_code: e.target.value,
            start_date: "",
            end_date: "",
            banner_url: "",
            festival_name: "",
            festival_description: "",
          });
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Something went wrong!");
        });
    }
  };

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRestaurantChange = (value) => {
    setValues({ ...values, restaurantArr: value });
  };

  const handleCreateBannerSubmit = (e) => {
    e.preventDefault();
    if (values.hotel_code === "" || values.hotel_code === "Please select") {
      window.alert("Please select a hotel code");
      return;
    }
    if (values.festival_name.trim() === "") {
      window.alert("Festival name cannot be empty");
      return;
    }
    if (values.restaurantArr.length === 0) {
      window.alert("Please select atleast 1 restaurant");
      return;
    }

    if (window.confirm(JSON.stringify(values, null, 2))) {
      console.log(values);
      showSpinnerModal();
      createBanner(values, user.token)
        .then((res) => {
          setLoading(false);
          hideSpinnerModal();
          toast.success(
            `Banners added successfully for the restaurants ${res.data.join(
              ", "
            )}`
          );
          loadAllBanners();
        })
        .catch((err) => {
          setLoading(false);
          hideSpinnerModal();
          toast.error("Something went wrong!");
        });
    }
  };

  const searched = (keyword) => (b) =>
    b.festival_name.toLowerCase().includes(keyword) ||
    b.restaurant_name.toLowerCase().includes(keyword) ||
    b.festival_id.toLowerCase().includes(keyword) ||
    b.hotel_code.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <UserNav />
        </div>
        <div className="col-lg-10" style={{ marginTop: "50px" }}>
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <>
              <h4>Festival Banner</h4>
              <hr />
            </>
          )}

          <div className="form-group">
            <label>
              <b>Hotel Code</b>{" "}
              <h5
                style={{
                  display: "inline-block",
                  color: "red",
                  marginBottom: "0px",
                }}
              >
                *
              </h5>
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

          <div className="row ml-1">
            <div className="col-lg-4 create-banner-box mt-3">
              <form className="form-group" onSubmit={handleCreateBannerSubmit}>
                <label className="mt-3">
                  <b>
                    Festival Name{" "}
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
                <input
                  type="text"
                  name="festival_name"
                  className="form-control"
                  value={values.festival_name}
                  onChange={handleInputChange}
                  autoComplete="off"
                  required
                />

                <label className="mt-3">
                  <b>Festival Description </b>
                </label>
                <input
                  type="text"
                  name="festival_description"
                  className="form-control"
                  value={values.festival_description}
                  onChange={handleInputChange}
                  autoComplete="off"
                />

                <label className="mt-3">
                  <b>Restaurants</b>{" "}
                  <h5
                    style={{
                      display: "inline-block",
                      color: "red",
                      marginBottom: "0px",
                    }}
                  >
                    *
                  </h5>
                </label>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  value={values.restaurantArr}
                  onChange={(value) => handleRestaurantChange(value)}
                  className="mt-2"
                >
                  {restaurantOptions.length &&
                    restaurantOptions.map((r, i) => (
                      <Option value={r.name} key={i}>
                        {r.name}
                      </Option>
                    ))}
                </Select>

                <label className="mt-3">
                  <b>Start Date</b>{" "}
                  <h5
                    style={{
                      display: "inline-block",
                      color: "red",
                      marginBottom: "0px",
                    }}
                  >
                    *
                  </h5>
                </label>
                <input
                  type="date"
                  name="start_date"
                  className="form-control"
                  value={values.start_date}
                  onChange={handleInputChange}
                  autoComplete="off"
                  required
                />

                <label className="mt-3">
                  <b>End Date</b>{" "}
                  <h5
                    style={{
                      display: "inline-block",
                      color: "red",
                      marginBottom: "0px",
                    }}
                  >
                    *
                  </h5>
                </label>
                <input
                  type="date"
                  name="end_date"
                  className="form-control"
                  value={values.end_date}
                  onChange={handleInputChange}
                  autoComplete="off"
                  required
                />

                <label className="mt-3">
                  <b>Banner URL</b>{" "}
                </label>
                <input
                  type="text"
                  name="banner_url"
                  className="form-control"
                  value={values.banner_url}
                  onChange={handleInputChange}
                  autoComplete="off"
                />

                <br />
                <button
                  className="btn btn-primary btn-raised btn-block"
                  type="submit"
                  disabled={loading}
                >
                  Save Banner
                </button>
              </form>
            </div>

            <div className="col-lg-8 mt-3">
              <h4 className="text-center">Banners</h4>
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />
              {banners.length === 0 && !loading && (
                <h6 className="text-warning text-center">
                  No Festival Banners found!
                </h6>
              )}
              {banners.length > 0 &&
                banners.filter(searched(keyword)).map((b, i) => {
                  return (
                    <FestiveBanners
                      b={b}
                      key={i}
                      loadAllBanners={loadAllBanners}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FestiveBannerCreate;
