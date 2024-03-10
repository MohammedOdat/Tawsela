import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";
import logo1 from "../images/fur.jpg";
import logo2 from "../images/winsh.jpg";
import logo3 from "../images/gass.jpg";
import "./Home.css";
const Home = () => {
  const { token, userId, setUserId, isLoggedIn, role, setRole, setUserName } =
    useContext(LoginContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/check", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setUserId(result.data.info.userId);
        setUserName(result.data.info.author);
        localStorage.setItem("userId", result.data.info.userId);
        localStorage.setItem("userName", result.data.info.author);
        setRole(result.data.info.role.role);
        localStorage.setItem("role", result.data.info.role.role);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  role === "Provider" && navigate("providerDashboard");
  role === "Client" && navigate("clientDashboard");
  return (
    <div className="Home-Page">
      <div className="Carousel">
        <Carousel fade>
          <Carousel.Item style={{ width: "100%", height: "100%" }}>
            <img className="d-block w-90" src={logo1} />
            <Carousel.Caption>
              <h3>Furniture Delivery</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ width: "100%", height: "100%" }}>
            <img className="d-block w-100" src={logo2} />
            <Carousel.Caption>
              <h3>Car Transporter</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ width: "100%", height: "100%" }}>
            <img className="d-block w-100" src={logo3} />
            <Carousel.Caption>
              <h3>Gas Cylinders Delivery</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <h3>We are very fast...</h3>
      <h4>what are you waiting for ??</h4>
      <Button
        onClick={() => {
          navigate("register");
        }}
        variant="link"
        style={{ color: "black", fontSize: "1.5em" }}
      >
        Register now
      </Button>
      <div className="cards">
        <Card style={{ width: "25%" }}>
          <Card.Body>
            <Card.Title>
              <h2>About Us</h2>
            </Card.Title>
            <br />
            <Card.Subtitle className="mb-2 text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-people-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
              </svg>
            </Card.Subtitle>
            <Card.Text style={{ fontSize: "1.25em", textAlign: "left" }}>
              We Are Multi Delivery Services by Heavy Car , Our service is very
              fast with less cost. order us now..
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "25%" }}>
          <Card.Body>
            <Card.Title>
              <h2>Contact Us</h2>
            </Card.Title>
            <br />
            <Card.Subtitle className="mb-2 text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-telephone-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                />
              </svg>
            </Card.Subtitle>
            <Card.Text style={{ fontSize: "1.25em", textAlign: "left" }}>
              <p> contact us by:</p>
              <p style={{ fontSize: "1em" }}>
                <strong> Phone Number</strong> +962796042844
              </p>
              <p style={{ fontSize: "1em" }}>
                <strong>Email Address </strong> mohammed.a.odatt@gmail.com
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "25%" }}>
          <Card.Body>
            <Card.Title>
              <h2>Be With Us</h2>
            </Card.Title>
            <br />
            <Card.Subtitle className="mb-2 text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-person-fill-check"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
              </svg>
            </Card.Subtitle>
            <Card.Text style={{ fontSize: "1.25em", textAlign: "left" }}>
              <p> It's free.</p>
              <p>No subscription required</p>
              <Button
                onClick={() => {
                  navigate("register");
                }}
                variant="link"
                style={{
                  color: "blue",
                  fontSize: "1em",
                  textDecoration: "none",
                }}
              >
                Register now
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Home;
