import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Api from "../Axios/Api";
import { useState } from "react";
import { UserContext } from "../../App";

const AddProduct = () => {
  const [photoUrl, setphotoUrl] = useState(null);
  const [msg, setmsg] = useState(null);
  const [loading, setloading] = useState(false);
  const [loggedinUser, setloggedinUser] = useContext(UserContext);
  const { register, errors, handleSubmit } = useForm();

  const onChangeHandler = (event) => {
    setloading(true);
    const image = event.target.files[0];
    console.log(image);
    const imageData = new FormData();
    imageData.set("key", "292e93baf139ef4fb8b9f89680c2dc9a");
    imageData.append("image", image);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then((response) => {
        setphotoUrl(response.data.data.display_url);
          setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(photoUrl);

  const onSubmit = (data) => {
    const { email } = loggedinUser;
    !loading
      ? Api.post("/admin/posts", {
          email: email,
          name: data.name,
          wight: data.wight,
          price: data.price,
          photo: `${photoUrl}`,
        })
          .then((response) => {
            setmsg(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
      : setmsg("please wait for upload image!!!");
  };
  return (
    <div className="m-3">
      <h2 className="m-4 p-3 bg-info text-white">Add product</h2>
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
      <div className="m-atuo card bg-white mt-5 p-5 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="gx-3 col-md-6">
              <div className="form-group">
                <h6 htmlFor="Name*">Product Name</h6>
                <input
                  name="name"
                  className="form-control"
                  ref={register({ required: true, maxLength: 20 })}
                />
                {errors.name && "Product  name is required(maxLength:20"}
              </div>

              <div className="form-group">
                <label htmlFor="wight*">Product wight</label>
                <input
                  name="wight"
                  className="form-control"
                  ref={register({ required: true, maxLength: 100 })}
                />
                {errors.name && "Product  wight is required(maxLength:100"}
              </div>
            </div>

            <div className="gx-3 col-md-6">
              <div className="form-group">
                <h6 htmlFor="price*">Product price</h6>
                <input
                  name="price"
                  className="form-control"
                  ref={register({ required: true, maxLength: 100 })}
                />
                {errors.name && "Product  price is required(maxLength:100"}
              </div>

              <div className="form-group">
                {loading && (
                  <div>
                    <div>
                      <h5 className="text-primary">uploading...</h5>
                    </div>
                    <div
                      class="spinner-border text-primary ml-auto"
                      role="status"
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
                <h6 htmlFor="">File*</h6>
                <input
                  name="photo"
                  className="form-control"
                  type="file"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>

          <input className="btn btn-primary " type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
