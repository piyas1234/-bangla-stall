import React, { useState } from 'react';
import './css/login.css'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { firebaseConfig, socialLoin, emailLogin } from './firebase/firebase.config'
import { useContext } from "react";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const Login = () => {
    const [inputData, setinputData] = useState({ email: "", password: "" })
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    const [errMsg, seterrMsg] = useState("")
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const githubProvider = new firebase.auth.GithubAuthProvider();
    const history = useHistory()
    const location = useLocation()
    const { from } = location.state || { from: { pathname: "/" } };

    const goHistotyPage = () => {
        history.replace(from)
    }

    const onChangeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        setinputData({ ...inputData, [name]: value })

    }
    const { email, password } = inputData;
    return (
        <div>
            <div className="col-md-6 offset-md-3">
                <div className="form mt-5">
                    {errMsg && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>{errMsg}</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}
                    <h2 class="mt-5 text-center text-gray">Login</h2>
                    <form action="" method="post">
                        <div className="mt-4 group">
                            <label htmlFor="">UserName or Eamil</label>
                            <input onChange={onChangeHandler} name="email" class="input" type="text" />
                        </div>
                        <div className="mt-2 group">
                            <label htmlFor="">Password</label>
                            <input onChange={onChangeHandler} name="password" class="input" type="password" />
                        </div>
                        <div className="mt-4 mb-5 group">
                            <button onClick={() => emailLogin(setLoggedinUser, goHistotyPage, email, password, seterrMsg)} class="input group btn" type="button">Login</button>
                            <small>Create a new Account <Link to="/signup">Signup</Link></small>
                        </div>
                    </form>
                </div>
                <div className="mt-4 mb-5 group">
                    <div className="text-center">or</div>
                    <hr />
                    <div onClick={() => socialLoin(googleProvider, setLoggedinUser, goHistotyPage, seterrMsg)} className=" p-1 social-log"><FontAwesomeIcon className="text-warning" size="2x" icon={faGoogle} />{" "}   <h6 style={{ display: "inline", color: "gray" }}>Continue with Google</h6></div>
                    <div onClick={() => socialLoin(facebookProvider, setLoggedinUser, goHistotyPage, seterrMsg)} className=" p-1 social-log"><FontAwesomeIcon className="text-primary" size="2x" icon={faFacebook} />{" "} <h6 style={{ display: "inline", color: "gray" }}>Continue with FaceBook</h6></div>
                    <div onClick={() => socialLoin(githubProvider, setLoggedinUser, goHistotyPage, seterrMsg)} className=" p-1 social-log"><FontAwesomeIcon className="text-dark" size="2x" icon={faGithub} />{" "} <h6 style={{ display: "inline", color: "gray" }}>Continue with Github</h6></div>
                </div>
            </div>
        </div>
    );
};

export default Login;