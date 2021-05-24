import React, { useEffect, useState, useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import UserNav from "../nav/UserNav";
import { LoadingOutlined } from "@ant-design/icons";
import { getPendingApprovals, addApproval } from "../../functions/approvals";
import SpinnerModalContext from "../../contexts/SpinnerModalContext";

function PendingApprovals() {
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [offers, setOffers] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showSpinnerModal, hideSpinnerModal } = useContext(
    SpinnerModalContext
  );

  const { user } = useSelector((state) => ({ ...state }));

  const loadApprovals = useCallback(() => {
    setLoading(true);
    getPendingApprovals(user.token)
      .then((res) => {
        setLoading(false);
        setRestaurants(res.data.restaurantArr);
        setMenuItems(res.data.menuItemArr);
        setOffers(res.data.offerArr);
        setBanners(res.data.festiveMenuArr);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(
          "Something went wrong. Please reload the page and try again"
        );
      });
  }, [user.token]);

  useEffect(() => {
    loadApprovals();
  }, [loadApprovals]);

  const handleApprove = (data) => {
    if (window.confirm("Are you sure you want to approve this request?")) {
      showSpinnerModal();
      addApproval(data, user.token)
        .then((res) => {
          setLoading(false);
          hideSpinnerModal();
          toast.success("Request approved");
          loadApprovals();
        })
        .catch((err) => {
          setLoading(false);
          hideSpinnerModal();
          toast.error(
            "Something went wrong. Please reload the page and try again"
          );
        });
      console.log(data);
    }
  };

  return (
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
              <h4>Pending Approvals</h4>
            </>
          )}
          <hr />
          <div>
            <h5>Restaurants</h5>
            {restaurants.length === 0 ? (
              <h6 className="text-warning">
                No pending approvals for restaurants
              </h6>
            ) : (
              restaurants.map((r) => {
                return (
                  <>
                    <div
                      className="alert alert-success"
                      key={r.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "6px",
                        paddingBottom: "5px",
                      }}
                    >
                      <div style={{ fontWeight: "bolder", fontSize: "1rem" }}>
                        {r.name} - ({r.hotel_code})
                      </div>
                      <span>
                        <button
                          className="btn btn-raised btn-primary bg-danger"
                          title="Approve"
                          onClick={() =>
                            handleApprove({
                              container: "restaurants",
                              id: r.id,
                            })
                          }
                        >
                          Approve
                        </button>
                      </span>
                    </div>
                  </>
                );
              })
            )}
            <br />
            <hr className="hrStyles" />

            <br />
            <h5>Festival Banners</h5>
            {banners.length === 0 ? (
              <h6 className="text-warning">
                No pending approvals for festival banners
              </h6>
            ) : (
              banners.map((r) => {
                return (
                  <>
                    <div
                      className="alert alert-success"
                      key={r.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "6px",
                        paddingBottom: "5px",
                      }}
                    >
                      <div style={{ fontWeight: "bolder", fontSize: "1rem" }}>
                        {r.festival_name} ({r.restaurant_name} - {r.hotel_code})
                      </div>
                      <span>
                        <button
                          className="btn btn-raised btn-primary bg-danger"
                          title="Approve"
                          onClick={() =>
                            handleApprove({
                              container: "festive_menu",
                              id: r.id,
                            })
                          }
                          disabled={loading}
                        >
                          Approve
                        </button>
                      </span>
                    </div>
                  </>
                );
              })
            )}
            <br />
            <hr className="hrStyles" />

            <br />
            <h5>Offers</h5>
            {offers.length === 0 ? (
              <h6 className="text-warning">No pending approvals for offers</h6>
            ) : (
              offers.map((r) => {
                return (
                  <>
                    <div
                      className="alert alert-success"
                      key={r.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "6px",
                        paddingBottom: "5px",
                      }}
                    >
                      <div style={{ fontWeight: "bolder", fontSize: "1rem" }}>
                        {r.promotion_name} - {r.promotion_code}
                      </div>
                      <span>
                        <button
                          className="btn btn-raised btn-primary bg-danger"
                          title="Approve"
                          onClick={() =>
                            handleApprove({ container: "offers", id: r.id })
                          }
                        >
                          Approve
                        </button>
                      </span>
                    </div>
                  </>
                );
              })
            )}
            <br />

            <hr className="hrStyles" />

            <br />

            <h5>Menu Items</h5>
            {menuItems.length === 0 ? (
              <h6 className="text-warning">
                No pending approvals for menu items
              </h6>
            ) : (
              menuItems.map((r) => {
                return (
                  <>
                    <div
                      className="alert alert-success"
                      key={r.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "6px",
                        paddingBottom: "5px",
                      }}
                    >
                      <div style={{ fontWeight: "bolder", fontSize: "1rem" }}>
                        {r.title} ({r.restaurant_name} - {r.hotel_code})
                      </div>
                      <span>
                        <button
                          className="btn btn-raised btn-primary bg-danger"
                          title="Approve"
                          onClick={() =>
                            handleApprove({ container: "menu_items", id: r.id })
                          }
                        >
                          Approve
                        </button>
                      </span>
                    </div>
                  </>
                );
              })
            )}
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingApprovals;
