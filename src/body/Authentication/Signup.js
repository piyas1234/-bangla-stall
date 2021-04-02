import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {
  firebaseConfig,
  socialLoin,
  emailSignup,
} from "./firebase/firebase.config";
import { FromValidator } from "./FormValidation";
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const Signup = () => {
  const [inputData, setinputData] = useState({});
  const [errMsg, seterrMsg] = useState("");
  const [msg, setmsg] = useState({});
  const [loggedinUser, setLoggedinUser] = useContext(UserContext);
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const githubProvider = new firebase.auth.GithubAuthProvider();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  console.log(loggedinUser);
  const goHistotyPage = () => {
    history.replace(from);
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setinputData({ ...inputData, [name]: value });
    FromValidator(inputData, msg, setmsg);
  };

  const { nameMsg, emailMsg, passwordMsg, confirmPasswordMsg } = msg;
  const { name, email, password } = inputData;

  const onClickHandler = () => {
    if (
      nameMsg === "okk" &&
      emailMsg === "okk" &&
      passwordMsg === "okk" &&
      confirmPasswordMsg === "okk"
    ) {
      emailSignup(
        setLoggedinUser,
        goHistotyPage,
        name,
        email,
        password,
        seterrMsg
      );
    } else {
      seterrMsg("please fill all the Fields");
    }
  };
 
  return (
    <div className="login-main">
      <div className="col-md-6 offset-md-3 ">
        <div className="form mt-5">
          {errMsg && (
            <div
              class="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>{errMsg}</strong>
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

          <h2 class="mt-5 text-center text-gray"> Create a account</h2>
          <form action="" method="post">
            <div className="mt-2 group">
              <label htmlFor="">Name</label>
              <input
                name="name"
                onKeyUp={onChangeHandler}
                onChange={onChangeHandler}
                class="input"
                type="text"
              />
              {nameMsg == "okk" ? (
                <p className="text-primary"> {nameMsg}</p>
              ) : (
                <p className="text-danger"> {nameMsg}</p>
              )}
              
            </div>
            <div className="mt-2 group">
              <label htmlFor="">UserName or Eamil</label>
              <input
                name="email"
                onKeyUp={onChangeHandler}
                onChange={onChangeHandler}
                class="input"
                type="email"
              />
              {emailMsg === "okk" ? (
                <p className="text-primary"> {emailMsg}</p>
              ) : (
                <p className="text-danger"> {emailMsg}</p>
              )}
            </div>
            <div className="mt-2 group">
              <label htmlFor="">Password</label>
              <input
                name="password"
                onKeyUp={onChangeHandler}
                onChange={onChangeHandler}
                class="input"
                type="password"
              />
              {passwordMsg === "okk" ? (
                <p className="text-primary"> {passwordMsg}</p>
              ) : (
                <p className="text-danger"> {passwordMsg}</p>
              )}
            </div>
            <div className="mt-2 group">
              <label htmlFor="">Confirm Password</label>
              <input
                name="confirmPassword"
                onKeyUp={onChangeHandler}
                onChange={onChangeHandler}
                class="input group"
                type="password"
              />
              {confirmPasswordMsg === "okk" ? (
                <p className="text-primary"> {confirmPasswordMsg}</p>
              ) : (
                <p className="text-danger"> {confirmPasswordMsg}</p>
              )}
            </div>
            <div className="mt-2 mb-5 group">
              <button
                onClick={onClickHandler}
                class="input group btn"
                type="button"
              >
                signUp
              </button>
            </div>
          </form>
        </div>
        <div className="mt-4 mb-5 group">
          <div className="text-center">or</div>
          <hr />
          <div
            onClick={() =>
              socialLoin(
                googleProvider,
                setLoggedinUser,
                goHistotyPage,
                seterrMsg
              )
            }
            className=" p-1 social-log"
          >
            <FontAwesomeIcon
              className="text-warning"
              size="2x"
              icon={faGoogle}
            />{" "}
            <h6 style={{ display: "inline", color: "gray" }}>
              Continue with Google
            </h6>
          </div>
          <div
            onClick={() =>
              socialLoin(
                facebookProvider,
                setLoggedinUser,
                goHistotyPage,
                seterrMsg
              )
            }
            className=" p-1 social-log"
          >
            <FontAwesomeIcon
              className="text-primary"
              size="2x"
              icon={faFacebook}
            />{" "}
            <h6 style={{ display: "inline", color: "gray" }}>
              Continue with FaceBook
            </h6>
          </div>
          <div
            onClick={() =>
              socialLoin(
                githubProvider,
                setLoggedinUser,
                goHistotyPage,
                seterrMsg
              )
            }
            className=" p-1 social-log"
          >
            <FontAwesomeIcon className="text-dark" size="2x" icon={faGithub} />{" "}
            <h6 style={{ display: "inline", color: "gray" }}>
              Continue with Github
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
