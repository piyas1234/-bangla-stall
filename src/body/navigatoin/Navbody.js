import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Nav.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darkModeContext, UserContext } from "../../App";
import NavProfile from "./NavProfile";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import DarkMode from "./DarkMode";
import { faShopware } from "@fortawesome/free-brands-svg-icons";

const Navbody = () => {
  const [inputData, setinputData] = useContext(UserContext);
  const [mode, setmode] = useContext(darkModeContext);
  const { email, emailVerified, displayName } = inputData;

  const navBarStyle = {
    fontFamily: "'Poppins', sans-serif",
  };
  const navStyle = { boxShadow: "1px 2px 3px 3px  gray" };
  const navStylebtn = {
    boxShadow: "1px 2px 2px 2px  gray",
    backgroundColor: "tomato",
  };
  const classNameValue = mode
    ? "bg-dark text-white p-2 rounded"
    : "bg-primary text-white p-2 rounded";

  return (
    <div className="nav-container">
      <Navbar className="p-3 main-nav" style={navBarStyle} bg="" expand="lg">
        <Navbar.Brand>
          <h3>
            <Link className="text-white p-2 rounded" style={navStylebtn} to="/">
              {" "}
              <FontAwesomeIcon
                className="text-white"
                size="1x"
                icon={faShopware}
              />{" "}
              Bangla Stall
            </Link>
          </h3>
        </Navbar.Brand>
        <Navbar.Toggle className="bg-primary p-2" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link>
              <DarkMode></DarkMode>
            </Nav.Link>
            <Nav.Link>
              <Link to="/">
                <h5 className={classNameValue} style={navStyle}>
                  Home
                </h5>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/checkout">
                <h5 className={classNameValue} style={navStyle}>
                  Cart
                </h5>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/order">
                <h5 className={classNameValue} style={navStyle}>
                  order
                </h5>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/blog">
                <h5 className={classNameValue} style={navStyle}>
                  Deals
                </h5>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/admin">
                <h5 className={classNameValue} style={navStyle}>
                  Admin
                </h5>
              </Link>
            </Nav.Link>

            {email || displayName || emailVerified ? (
              <>
                <Nav.Link>
                  <NavProfile
                    setinputData={setinputData}
                    value={inputData}
                  ></NavProfile>
                </Nav.Link>{" "}
              </>
            ) : (
              <>
                <Nav.Link>
                  <Link to="/login">
                    <h5 style={navStylebtn} className="text-white btn">
                      Login
                    </h5>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <NavProfile
                    setinputData={setinputData}
                    value={inputData}
                  ></NavProfile>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navbody;
