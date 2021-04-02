import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Api from "../Axios/Api";

const DeshBoard = () => {
  const [data, setdata] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [msg, setmsg] = useState(null);
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
    Api.delete(`/posts/delete/${id}`)
      .then((res) => {
        res.data.count > 0 && setrefresh(true);
        res.data.count > 0 && setmsg("data deleted!!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-5">
      <h2 className="m-3 text-primary">DeshBoard</h2>
      <div class="table-responsive text-primary">
        {msg && (
          <div class="alert alert-warning alert-dismissible fade show">
            <strong>{msg}</strong>
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
          </div>
        )}

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
                const { _id, name, wight, price, photo } = item;
                return (
                  <tr>
                    <td>{name}</td>
                    <td>{wight}</td>
                    <td>{price}</td>
                    <td>
                      <img width="60px" src={photo} alt="" srcset="" />
                    </td>
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
