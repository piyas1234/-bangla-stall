import React, { useContext, useState } from "react";
import "./cheekout.css";
import { Link } from "react-router-dom";
import { CheckoutContext, UserContext } from "../../App";
import Api from "../Axios/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

const Checkout = () => {
  const [msg, setmsg] = useState("");
  const [checkout, setcheckout] = useContext(CheckoutContext);
  const [loggedinUser, setloggedinUser] = useContext(UserContext);
  const { email, username } = loggedinUser;
  let totalPrice = 0;
  checkout.forEach((item) => {
    totalPrice += item.price * 1;
  });

  const data = { email: email, date: new Date(), checkout: checkout };
  const onClickHandler = () => {
    console.log("checkout");
    Api.post(`/admin/checkout`, data)
      .then((req, res) => {
        console.log(res);
        setcheckout([]);
        setmsg("Your order Hasbeen placed!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return   (
    <div className="main">
      <h1 className="mt-5">Checkout</h1>
      <div className="card">
        {msg && (
          <div
            class="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>{msg}</strong>
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        
        <div class="table-responsive">
      
        <table class="table  table-hover">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {checkout &&
              checkout.map((item) => {
                const { name, wight, price } = item;
                let value = 1;
                return (
                  <tr>
                    <td>
                      <h6>{name + " " + wight}</h6>
                    </td>
                    <td>
                      {" "}
                      <h6>{(item.quentity = value)}</h6>
                    </td>
                    <td>
                      <h6>{price}</h6>
                    </td>
                  </tr>
                );
              })}

             
          </tbody>
          
        </table>
      </div>
       <div className="card p-2 bg-info text-white">
       <h4  >Total Amount: {totalPrice+" "}<FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon> </h4>
          
        </div>
        </div>
     
      <div className="d-flex m-5">
        <Link to="/" className=" btn btn-warning">
          Add More
        </Link>
        <button
          onClick={onClickHandler}
          type="submit"
          className="btn btn-success ml-auto "
        >
          Cheekout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
