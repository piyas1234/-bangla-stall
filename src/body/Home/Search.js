import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { CheckoutContext } from "../../App";
import Api from "../Axios/Api";

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
    <div >
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
              <div className="gx-3 col-md-6 col-lg-4 mt-3 ">
                <div className="card bg-white p-2 go-card m-3">
                  <img
                    className="card-img  m-auto"
                    src={photo}
                    alt=""
                    srcset=""
                  />

                  <div className="m-3">
                    <h5 className="text-dark">{name + "-" + wight}</h5>
                    <div className="d-flex">
                      <h4 className="text-success">
                        Price:
                        <FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon>
                        {price}
                      </h4>
                      <Link
                        onClick={() => onClickHandler(item)}
                        className="btn bg-success text-white ml-auto"
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
