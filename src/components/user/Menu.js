import React, { useState } from "react";
import UserNav from "../nav/UserNav";
import { useSelector } from "react-redux";
import { getRestaurantsByHotel } from "../../functions/hotels";
import { getMenuForRestaurant, removeMenuItem } from "../../functions/menu";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Modal, Button } from "antd";
import {
  EditOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import LocalSearch from "../forms/LocalSearch";
import { menuColor } from "../utils/utils";
import noimage from "../../images/noimage.png";

function Menu({ history }) {
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [menu, setMenu] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  const hotels = user.hotels;

  const [modalMenu, setModalMenu] = useState({});

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (m) => {
    setIsModalVisible(true);
    console.log("clicked");
    setModalMenu(m);
  };

  const handleEdit = (id) => {
    setIsModalVisible(false);
    history.push(`/user/menu/update/${id}`);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setShowRestaurants(false);
    if (e.target.value !== "Please select") {
      setRestaurantOptions([]);
      setMenu([]);
      setLoading(true);
      getRestaurantsByHotel(e.target.value, user.token)
        .then((res) => {
          //console.log(res.data);
          setRestaurantOptions(res.data);
          setShowRestaurants(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error("Something went wrong");
        });
    }
  };

  const handleRestaurantChange = (e) => {
    if (e.target.value !== "Please select") {
      setMenu([]);
      setLoading(true);
      console.log("restaurant selected!");
      loadMenuItems(e.target.value, user.token);
      setSelectedRestaurant(e.target.value);
    }
  };

  const loadMenuItems = (restaurantId, token) => {
    getMenuForRestaurant(restaurantId, token)
      .then((res) => {
        //console.log(res.data);
        setLoading(false);
        setMenu(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (id, title, item_ref_id) => {
    if (user.role !== "admin") {
      window.alert("You have user role and cannot delete menu item");
      return;
    }
    setIsModalVisible(false);

    if (window.confirm(`Do you want to delete ${title} (${item_ref_id})?`)) {
      setLoading(true);
      removeMenuItem(id, selectedRestaurant, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(res.data);
          loadMenuItems(selectedRestaurant, user.token);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toast.error("Something went wrong");
        });
    }
  };

  const handleMenuClick = (id) => {
    if (user.role !== "user" && user.role !== "admin") {
      window.alert("You cannot edit this menu item");
      return;
    }
    history.push(`/user/menu/update/${id}`);
  };

  const searched = (keyword) => (m) =>
    m.title.toLowerCase().includes(keyword) ||
    m.item_ref_id.toString().includes(keyword);

  return (
    <>
      <div className="container-fluid">
        <Modal
          Modal
          title={`${modalMenu.title}    -    Rs. ${modalMenu.price}`}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="Cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="Edit"
              type="primary"
              onClick={() => handleEdit(modalMenu.id)}
            >
              Edit
            </Button>,
          ]}
        >
          <div>
            <img
              src={
                modalMenu.pdp_image_url !== ""
                  ? modalMenu.pdp_image_url
                  : noimage
              }
              alt="Restaurant"
              style={{ height: "400px", width: "400px" }}
            />
          </div>
        </Modal>
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col-md-10" style={{ marginTop: "50px" }}>
            {loading ? (
              <LoadingOutlined className="text-danger h1" />
            ) : (
              <>
                <h4>Menu Items</h4>
                <hr />
                <div className="legend legend-danger">Non Veg</div>
                <div className="legend legend-success">Veg</div>
              </>
            )}
            <div className="form-group">
              <label>
                <b>Hotel Code</b>
              </label>
              <select
                name="hotel_code"
                className="form-control"
                onChange={handleChange}
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
                  <b>Restaurant</b>
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
            {menu.length !== 0 && (
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            )}
            {menu.filter(searched(keyword)).map((m) => (
              <div
                className={menuColor(m.food_type)}
                key={m.id}
                style={{
                  fontWeight: "bold",
                }}
              >
                <div
                  onClick={() => showModal(m)}
                  style={{
                    display: "inline-block",
                    width: "85%",
                    height: "100%",
                  }}
                  title={`Rs. ${m.price}`}
                >
                  {m.title} ({m.item_ref_id})
                </div>
                <span className="float-right">
                  <DeleteOutlined
                    className="text-danger btn btn-outline p-1 ml-2"
                    onClick={() => handleRemove(m.id, m.title, m.item_ref_id)}
                    title="Delete"
                  />
                </span>
                <Link to="#" onClick={() => handleMenuClick(m.id)}>
                  <span className="float-right">
                    <EditOutlined
                      className="text-warning btn btn-outline p-1"
                      title="Edit"
                    />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
