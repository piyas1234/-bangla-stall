import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Api from "../Axios/Api";

const Order = () => {
  const [loggedinUser, setloggedinUser] = useContext(UserContext);
  const [data, setdata] = useState([]);
  const [spiner, setspiner] = useState(false)
  let totalPrice = 0;
  useEffect(() => {
    setspiner(true)
    const { email } = loggedinUser;
    Api.post("user/checkout", {
      email: email,
    })
      .then((res) => {
        setdata(res.data);
        setspiner(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return spiner ? (
    <div className="d-flex w-50 m-auto">
       <h3 className="text-warning">Loading....</h3>
       <div class="spinner-border text-primary ml-auto" role="status">
    </div>
    </div>
  ) : (
    <div>
      <div className="col-md-10 offset-md-1">
        <h1 className="bg-primary p-3 text-center text-white">Order List</h1>
        {data &&
          data.map((item) => {
            const { checkout, email, date } = item;
            return (
              <div className="card m-5">
                 <div className="bg-warning p-2 text-white">
                 <h4>{email}</h4>
                <h4>{date}</h4>
                 </div>
                {checkout &&
                  checkout.map((pd) => {
                    const { name, price, wight, photo } = pd;
                    totalPrice+=price*1;
                    return (
                       <div className="row d-flex ml-5 mr-5">
                         <div className=" ">
                           <h5>description: {name+" "+wight}</h5>
                           <h5>Price: {price+"$"}</h5>
                         </div>
                         <div className="ml-auto">
                           <img width="100px" src={photo} alt="" srcset=""/>
                         </div>
                         <hr/>
                       </div>
                    );
                  })}
                  <div className="d-flex ml-5 mr-5">
                           <h4>Total</h4>
                           <h4 className="ml-auto">={totalPrice+"$"}</h4>
                         </div>
                         <div className="d-flex ml-5 mr-5">
                          <button className=" btn btn-warning"> Cancel Order</button>
                          <button className=" btn btn-primary ml-auto"> Accept Order</button>
                          
                         </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Order;
