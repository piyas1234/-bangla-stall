import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Api from "../Axios/Api";

const Order = () => {
  const [loggedinUser, setloggedinUser] = useContext(UserContext);
  const [data, setdata] = useState([]);
  const [spiner, setspiner] = useState(false);
  let totalPrice = 0;
  useEffect(() => {
    setspiner(true);
    const { email } = loggedinUser;
    Api.post("user/checkout", {
      email: email,
    })
      .then((res) => {
        setdata(res.data);
        setspiner(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return spiner ? (
    <div
      className="d-flex w-50 m-auto"
    >
      <h3 className="text-warning">Loading....</h3>
      <div class="spinner-border text-primary ml-auto" role="status"></div>
    </div>
  ) : (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="col-md-10 offset-md-1 mt-5">
        <h2 className="">Order List</h2>
        {data &&
          data.map((item) => {
            const { checkout, email, date } = item;
            return (
              <div className="card mt-5">
                <div className="bg-info p-2 text-white">
                  <h5>{email}</h5>
                  <h6>{date}</h6>
                </div>
                <div className="card">
                  <div className="p-3">
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Wight</th>
                            <th>Price</th>
                            <th>Photo</th>
                          </tr>
                        </thead>
                        {checkout &&
                          checkout.map((pd) => {
                            const { name, price, wight, photo } = pd;
                            totalPrice += price * 1;
                            return (
                              <tbody>
                                <tr>
                                  <td>{name}</td>
                                  <td>{wight}</td>
                                  <td>{price}</td>
                                  <td>
                                    <img
                                      width="60px"
                                      height="60px"
                                      src={photo}
                                      alt=""
                                      srcset=""
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}
                      </table>
                    </div>
                  </div>
                </div>
                <div className="d-flex ml-5 mr-5 p-3">
                  <h4 className="text-warning">Total: {totalPrice}<FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon></h4>
                  <button className="btn btn-warning ml-auto text-white" type="submit">
                    cancel Order
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Order;
