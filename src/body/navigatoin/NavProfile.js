import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";

const NavProfile = (props) => {
  const [lgShow, setLgShow] = useState(false);
  const { displayName, email, emailVerified, photoURL } = props.value || null;
  const [inputData, setinputData] = useContext(UserContext);
  const onClickHandler = () => {
    setinputData({});
    setLgShow(false);
  };

  return (
    <>
      <div className="ml-2" onClick={() => setLgShow(true)}>
        {photoURL ? (
          <img
            style={{
              width: "60px",
              borderRadius: "60px",
              marginTop: "-12px",
              border: "4px solid white",
              boxShadow: "3px 3px 3px 3px gray",
              fontFamily: "'Poppins', sans-serif",
            }}
            src={photoURL}
          ></img>
        ) : (
          <FontAwesomeIcon size="2x" icon={faUserPlus} />
        )}
      </div>
      <Modal
        className="bg-dark"
        size="md"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-md"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {photoURL ? (
              <img
                width="160px"
                className="card"
                style={{ boxShadow: "3px 3px 3px gray" }}
                src={photoURL}
                alt=""
                srcset=""
              />
            ) : (
              <FontAwesomeIcon size="2x" icon={faUserPlus} />
            )}
            <div className="m-3">
              <DarkMode></DarkMode>
            </div>
            <div className="card p-4 text-dark mt-4 rounded">
              <h3>Name : {displayName || "Guest"}</h3>
              <h5>Email: {email || "Guest@gmail.com"}</h5>
              {emailVerified && (
                <button
                  className="btn-sm btn-primary text-white m-3"
                  type="submit"
                >
                  {emailVerified == true ? (
                    <span>
                      {" "}
                      <h6>User verified</h6>
                      <FontAwesomeIcon size="2x" icon={faShieldAlt} />
                    </span>
                  ) : (
                    "user not verified"
                  )}
                </button>
              )}
              {displayName || emailVerified || email ? (
                <button
                  onClick={onClickHandler}
                  className="btn text-white btn-danger"
                  type="submit"
                >
                  logout
                </button>
              ) : (
                <Link
                  onClick={() => setLgShow(false)}
                  class="btn-sm btn-primary"
                  to="/login"
                >
                  Login
                </Link>
              )}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </>
  );
};

export default NavProfile;
