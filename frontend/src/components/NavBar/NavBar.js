import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./NavBar.css";
import { LoginContext } from "../../App";
import axios from "axios";
import logo from "../images/user1.jpg";
import logo3 from "../images/logo3.png";
const NavBar = () => {
  const { isLoggedIn, role, token, userId, setIsLoggedIn, userName } =
    useContext(LoginContext);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState({});
  const [url, setUrl] = useState("");
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [empty, setEmpty] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/user/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setUser(result.data.user[0]);
        result.data.user[0].image && setUrl(result.data.user[0].image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const getNotification = () => {
    axios
      .get(`http://localhost:5000/orders/notification/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        if (result.data.success) {
          setNotification(result.data.orders);
        } else {
          setEmpty("No Notification");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getNotification();
  }, [userId]);

  const logout = () => {
    setIsLoggedIn(false);
    setShow(false);
    localStorage.clear();
    navigate("/login");
  };
  const rejectOrder = (id) => {
    axios
      .delete(`http://localhost:5000/orders/${id}`)
      .then((result) => {
        const newNotification = notification.filter((ele, i) => {
          return ele._id != id;
        });
        if (newNotification.length) {
          setNotification(newNotification);
        } else {
         
          setEmpty("No Notification");
           
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateOrder = (id) => {
    axios
      .put(
        `http://localhost:5000/orders/${id}`,
        { state: "processing" },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        const newNotification = notification.filter((ele, i) => {
          return ele._id != id;
        });
        if (newNotification.length) {
          setNotification(newNotification);
        } else {
          setEmpty("no noftication at this time ");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Navbar
      style={{ paddingLeft: "5px", paddingRight: "10px" }}
      bg="dark"
      data-bs-theme="dark"
    >
      {isLoggedIn && (
        <div className="list">
          <svg
            onClick={handleShow}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Welcome {userName}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ width: "50%", height: "25%", alignSelf: "center" }}>
                {" "}
                <img src={url ? url : logo} style={{ borderRadius: "50%" }} />
              </div>
              <div>
                <div
                  style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-person-vcard-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
                  </svg>
                  <p
                    onClick={() => {
                      navigate("account");
                      handleClose();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    My Account
                  </p>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-bell-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                  </svg>
                  <p
                    onClick={() => {
                      handleClose();
                      handleShow1();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Notifications
                  </p>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>{" "}
                  <p style={{ cursor: "pointer" }} onClick={logout}>
                    Logout
                  </p>
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      )}
      {/**/}
      <Container>
        <span style={{ height: "60px", width: "60px", cursor: "pointer" }}>
          {" "}
          <img
            onClick={() => {
              navigate("/");
            }}
            src={logo3}
          />{" "}
        </span>
        <Navbar.Brand href="/">TAWSELA</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {isLoggedIn || (
            <>
              <Nav.Link href="login">Login</Nav.Link>
              <Nav.Link href="register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
      {isLoggedIn && (
        <div className="notification">
          <svg
            onClick={handleShow1}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill={notification ? "red" : "white"}
            class="bi bi-bell"
            viewBox="0 0 16 16"
            className="notification"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
          </svg>

          <Offcanvas show={show1} onHide={handleClose1} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Notification</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body
              style={{ display: "flex", flexDirection: "column" }}
            >
              {empty && <div>{empty}</div>}
              {notification &&
                notification?.map((ele, i) => (
                  
                  <div
                    style={{
                      border: "1px solid gray",
                      padding: "5px",
                      borderRadius: "7px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div>
                      
                      <h6>{ele.provider.firstName}</h6>
                    </div>
                    {ele.units !== 0 && (
                      <div>Number Of Cylenders : {ele.units} Cyl</div>
                    )}
                    <div>Total Price :{ele.price} JD</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "5px",
                      }}
                    >
                      <Button
                        variant="primary"
                        onClick={() => {
                          updateOrder(ele._id);
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          rejectOrder(ele._id);
                        }}
                      >
                        reject
                      </Button>
                    </div>
                  </div>
                ))}
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      )}
    </Navbar>
  );
};

export default NavBar;
