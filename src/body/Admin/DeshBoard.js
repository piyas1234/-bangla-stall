import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Api from "../Axios/Api";

const DeshBoard = () => {
  const [data, setdata] = useState([]);
  const [refresh, setrefresh] = useState(true);
  const [loggedinUser, setloggedinUser] = useContext(UserContext);
  useEffect(() => {
    const { email } = loggedinUser;
    Api.post("/admin/postsbyemail", { email: email })
      .then((res) => {
          setdata(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setrefresh(false);
  }, [refresh]);

  const onDelete = (id) => {
    Api.post(`posts/delete`, {
      id: id,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    setrefresh(true);
  };
  return (
    <div className="p-5">
      <h2 className="m-3 text-primary">DeshBoard</h2>
      <div class="table-responsive text-primary">
        <table class="table table-hover text-success">
          <thead>
            <tr>
              <th>name</th>
              <th>Weight</th>
              <th>price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => {
                const { _id, name, wight, price , photo } = item;
                return (
                  <tr>
                    <td>{name}</td>
                    <td>{wight}</td>
                    <td>{price}</td>
                    <td><img width="60px" src={photo} alt="" srcset=""/></td>
                    <td>
                      <button className="btn btn-warning" type="submit">
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(_id)}
                        className="btn btn-danger"
                        type="submit"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeshBoard;
