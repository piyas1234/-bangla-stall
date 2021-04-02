import React, { useContext, useEffect, useState } from "react";
import "./css/home.css";
import { Link, Redirect } from "react-router-dom";
import Api from "../Axios/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { CheckoutContext, darkModeContext } from "../../App";
import Carousel from "react-bootstrap/Carousel";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";

const Home = () => {
  const [data, setdata] = useState([]);
  const [redirect, setredirect] = useState(false);
  const [checkout, setcheckout] = useContext(CheckoutContext);
  const [mode, setmode] = useContext(darkModeContext);
  let bgColor = !mode ? {backgroundColor:"#B5EAF8"} : {backgroundColor:"black"}
  useEffect(() => {
    Api.get("/admin/posts")
      .then((res) => {
          setdata(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickHandler = (item) => {
    checkout.length > 0
      ? setcheckout([...checkout, item])
      : setcheckout([item]);
    setredirect(true);
  };

  return data.length < 1 ? (
    <div className="d-flex w-50 m-auto home-spinner">
      <div class="spinner-border text-primary m-auto" role="status"></div>
    </div>
  ) : redirect ? (
    <Redirect to="/checkout" />
  ) : (
    <div style={bgColor} className="home-container">
      <div className="col-md-10 offset-md-1">
        <Link to="/search">
          <div>
            <div className="d-flex  Search">
              <input
                type="search"
                name="search"
                placeholder="#Search your item here"
                className="form-control form-lg"
                id=""
              />
              <input
                className="btn btn-primary ml-2"
                type="submit"
                value="Search"
              />
            </div>
          </div>
        </Link>
        <Carousel className="slider bg-primary shadowSlider m-3 mt-5 card">
          {data &&
            data.slice(0, 5).map((item) => {
              const { name, photo, price, wight } = item;
              return (
                <Carousel.Item interval={1000}>
                  <div className="row">
                    <div className="col-md-6 gx-3 p-5">
                      <img
                        className="d-block card-img slider-img m-auto"
                        src={photo}
                        alt="First slide"
                      />
                    </div>
                    <div className="col-md-6 gx-3">
                      <Carousel.Caption
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.089)" }}
                        className="ml-auto rounded"
                      >
                        <h3>{name + "" + wight}</h3>
                        <h5>{price + "$"}</h5>
                        <Link
                          style={{backgroundColor:"tomato"}}
                          onClick={() => onClickHandler(item)}
                          className="btn text-white ml-auto"
                          type="submit"
                        >
                          Buy Now
                        </Link>
                      </Carousel.Caption>
                    </div>
                  </div>
                </Carousel.Item>
              );
            })}
        </Carousel>

        <div className="row">
          {data &&
            data.map((item) => {
              const { name, photo, price, wight } = item;
              return (
                <div className="gx-3 col-sm-6 col-md-6 col-lg-4 col-xl-3 mt-3  ">
                  <div className="card bg-white p-2 go-card m-3 ">
                    <FontAwesomeIcon className="text-success" size="3x" icon={faSalesforce}></FontAwesomeIcon>
                    20% off
                    <img
                      className="card-img  m-auto"
                      src={photo}
                      alt=""
                      srcset=""
                    />

                    <div className="m-3">
                      <h5 style={{fontFamily:"fantasy",fontWeight:"lighter"}} className="text-dark mb-3">{name + "-" + wight}</h5>
                      <hr/>
                      <div className="d-flex">
                        <h4 style={{fontFamily:"cursive",fontWeight:"bold",color:"#007BFF" ,textShadow:"1px 2px 2px gray"}}   >
                          Price:
                          <FontAwesomeIcon
                            icon={faDollarSign}
                          ></FontAwesomeIcon>
                          {price}
                        </h4>
                        <Link
                         style={{backgroundColor:"tomato"}}
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
      </div>
    </div>
  );
};

export default Home;
