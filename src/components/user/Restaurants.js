import React, { useState, useEffect } from "react";
import UserNav from "../nav/UserNav";
import { getRestaurants } from "../../functions/hotels";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import LocalSearch from "../forms/LocalSearch";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd";
import noimage from "../../images/noimage.png";

function Restaurants({ history }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [restaurants, setRestaurants] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalRestaurant, setModalRestaurant] = useState({});

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (r) => {
    setIsModalVisible(true);
    setModalRestaurant(r);
  };

  const handleEdit = (id) => {
    setIsModalVisible(false);
    history.push(`/user/restaurant/${id}`);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    loadRestaurants(user.hotels, user.token);
  }, [user.hotels, user.token]);

  const loadRestaurants = (hotels, token) => {
    setLoading(true);
    getRestaurants(hotels, token)
      .then((res) => {
        //console.log(res.data);
        setLoading(false);
        setRestaurants(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Token expired. Please reload the page");
      });
  };

  const onRestaurantClick = (id, hotel_code) => {
    if (user.role === "user" || user.role === "admin") {
      const check = user.hotels.filter((h) => h === hotel_code);
      if (check.length !== 0) {
        history.push(`/user/restaurant/${id}`);
        return;
      }
    }

    window.alert("You cannot edit the restaurant");
    return;
  };

  const searched = (keyword) => (r) =>
    r.name.toLowerCase().includes(keyword) ||
    r.hotel_name.toLowerCase().includes(keyword) ||
    r.hotel_code.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <Modal
        Modal
        title={`${modalRestaurant.name}  (${modalRestaurant.hotel_name})`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="Cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="Edit"
            type="primary"
            onClick={() => handleEdit(modalRestaurant.id)}
          >
            Edit
          </Button>,
        ]}
      >
        <div>
          <img
            src={
              modalRestaurant.menu_page_header_img_url !== ""
                ? modalRestaurant.menu_page_header_img_url
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
        <div
          className="col-md-10"
          style={{
            marginTop: "50px",
          }}
        >
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <>
              <h4>Restaurants</h4>
              <hr />
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            </>
          )}

          {restaurants.length === 0 ? (
            <h4 className="text-center text-warning">No restaurants found!</h4>
          ) : (
            restaurants.filter(searched(keyword)).map((r) => {
              return (
                <>
                  <div
                    className="alert alert-success"
                    key={r.id}
                    style={{ fontWeight: "bold" }}
                    onClick={() => showModal(r)}
                  >
                    {r.name} ({r.hotel_code} - {r.hotel_name})
                    <Link
                      to="#"
                      onClick={() => onRestaurantClick(r.id, r.hotel_code)}
                    >
                      <span className="float-right">
                        <EditOutlined
                          className="text-warning btn btn-outline p-1"
                          title="Edit"
                        />
                      </span>
                    </Link>
                  </div>
                </>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
