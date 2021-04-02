import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { CheckoutContext } from "../../App";
import Api from "../Axios/Api";
import "./css/home.css";

const Search = () => {
  const [input, setInput] = useState("");
  const [data, setdata] = useState([]);
  const [redirect, setredirect] = useState(false);
  const [checkout, setcheckout] = useContext(CheckoutContext);
  useEffect(() => {
    Api.post("/posts/search", { input: input })
      .then((res) => {
        setdata(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [input]);

  const onClickHandler = (item) => {
    checkout.length > 0
      ? setcheckout([...checkout, item])
      : setcheckout([item]);
    setredirect(true);
  };
  return redirect ? (
    <Redirect to="/checkout" />
  ) : (
    <div className="home-container">
      <div className="d-flex  Search">
        <input
          type="search"
          onChange={(e) => setInput(e.target.value)}
          name="search"
          placeholder="#Search your item here"
          className="form-control form-lg"
          id=""
        />
        <input className="btn btn-primary ml-2" type="submit" value="Search" />
      </div>

      <div className="row">
        {data &&
          data.map((item) => {
            const { name, photo, price, wight } = item;
            return (
              <div className="gx-3 col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3  ">
                <div className="card bg-white p-2 go-card m-3 ">
                  <FontAwesomeIcon
                    className="text-success"
                    size="3x"
                    icon={faSalesforce}
                  ></FontAwesomeIcon>
                  20% off
                  <img
                    className="card-img  m-auto"
                    src={photo}
                    alt=""
                    srcset=""
                  />
                  <div className="m-3">
                    <h5
                      style={{ fontFamily: "fantasy", fontWeight: "lighter" }}
                      className="text-dark mb-3"
                    >
                      {name + "-" + wight}
                    </h5>
                    <hr />
                    <div className="d-flex">
                      <h4
                        style={{
                          fontFamily: "cursive",
                          fontWeight: "bold",
                          color: "#007BFF",
                          textShadow: "1px 2px 2px gray",
                        }}
                      >
                        Price:
                        {price}
                        <FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon>
                      </h4>
                      <Link
                        style={{ backgroundColor: "tomato" }}
                        onClick={() => onClickHandler(item)}
                        className="btn   text-white ml-auto"
                        type="submit"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {data.length < 1 && (
        <div
          className="alert alert-danger alert-dismissible fade show mt-5"
          role="alert"
        >
          <strong>No Product Found!!!</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
