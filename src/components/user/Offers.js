import React, { useState, useEffect } from "react";
import UserNav from "../nav/UserNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import LocalSearch from "../forms/LocalSearch";
import { LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllOffers, removeOffer } from "../../functions/offer";
import { offerColor } from "../utils/utils";
import "../../css/styles.css";

function Offers({ history }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [offers, setOffers] = useState([]);
  const [redOffers, setRedOffers] = useState([]);
  const [greenOffers, setGreenOffers] = useState([]);
  //const [redOffers, setRedOffers] = useState([])
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllOffers();
  }, []);

  const loadAllOffers = () => {
    setLoading(true);
    getAllOffers(user.token)
      .then((res) => {
        setLoading(false);
        let o = res.data;
        // o.forEach(offer=>{
        //   offer.color = checkExpiry
        // })
        setOffers(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const onOfferEditClick = (id) => {
    history.push(`/user/offer/update/${id}`);
  };

  const handleRemove = (id, promotion_name) => {
    if (window.confirm(`Do you want to delete "${promotion_name}"?`)) {
      setLoading(true);
      removeOffer(id, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(res.data);
          loadAllOffers();
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Something went wrong");
        });
    }
  };

  const searched = (keyword) => (o) =>
    o.promotion_name.toLowerCase().includes(keyword) ||
    o.promotion_code.toLowerCase().includes(keyword);

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
              <h4>Offers</h4>
              <hr />
              <div className="legend legend-danger">Expires in 7 days</div>
              <div className="legend legend-warning">Expires in 7-30 days</div>
              <div className="legend legend-success">Expires after 30 days</div>
              <div className="legend legend-secondary">Expired</div>
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            </>
          )}

          {offers.filter(searched(keyword)).map((o) => {
            return (
              <div className="alert" key={o.id} style={offerColor(o.color)}>
                {o.promotion_code} - {o.promotion_name} ({o.short_description})
                <span className="float-right">
                  <DeleteOutlined
                    className="text-danger btn btn-outline p-1 ml-2"
                    onClick={() => handleRemove(o.id, o.promotion_name)}
                  />
                </span>
                <Link to="#">
                  <span className="float-right">
                    <EditOutlined
                      className="text-warning btn btn-outline p-1"
                      onClick={() => onOfferEditClick(o.id)}
                    />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Offers;
