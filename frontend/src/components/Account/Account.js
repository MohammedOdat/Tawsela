import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../App";
import axios from "axios";
import "./Account.css";
import logo from "../images/user1.jpg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const Account = () => {
  const { userId, token } = useContext(LoginContext);
  const [loader, setLoader] = useState(true);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState({});
  const [show, setShow] = useState(false);
  const [field, setField] = useState("");
  const updateUser = () => {
    axios
      .put(`http://localhost:5000/users/${userId}`, update, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        getinfo()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getinfo =()=>{
     setLoader(true);
    axios
      .get(`http://localhost:5000/users/user/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setLoader(false);
        setUser(result.data.user[0]);
        result.data.user[0].image && setUrl(result.data.user[0].image);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }
  useEffect(() => {
   getinfo()
  }, []);
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "TAWSELA");
    data.append("cloud_name", "breellz");
    fetch("https://api.cloudinary.com/v1_1/dwuoysqp9/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        update.image = data.url;
        updateUser();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {" "}
      <h2
        style={{
          marginLeft: "50px",
          marginTop: "25px",
          borderBottom: "1px solid black",
          paddingBottom: "10px",
        }}
      >
        My Account{" "}
        <svg
          onClick={() => {
            setShow(!show);
            setField("firstName");
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          cursor="pointer"
          height="16"
          fill="black"
          class="bi bi-pencil-fill"
          viewBox="0 0 16 16"
        >
          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
        </svg>
      </h2>
      {loader ? (
        <div className="loader"></div>
      ) : (
        <div className="info">
          <div className="left-side">
            <ul>
              First Name :{" "}
              <ul style={{ fontWeight: "bolder" }}>{user.firstName} </ul>
              {show && (
                <ul>
                  <input
                    onChange={(e) => {
                      if (e.target.value) {
                        update.firstName = e.target.value;
                      }
                    }}
                    type="text"
                    placeholder="First Name"
                  />
                </ul>
              )}
            </ul>
            <br />
            <ul>
              Last Name :{" "}
              <ul style={{ fontWeight: "bolder" }}>{user.lastName}</ul>
              {show && (
                <ul>
                  <input
                    onChange={(e) => {
                      if (e.target.value) {
                        update.lastName = e.target.value;
                      }
                    }}
                    type="text"
                    placeholder="Last Name"
                  />
                </ul>
              )}
            </ul>
            <br />
            <ul>
              Email : <ul style={{ fontWeight: "bolder" }}>{user.email}</ul>
            </ul>
            <br />
            <ul>
              PhoneNumber :{" "}
              <ul style={{ fontWeight: "bolder" }}>+{user.phoneNumber}</ul>
              {show && (
                <ul>
                  <input
                    onChange={(e) => {
                      if (e.target.value) {
                        update.phoneNumber = e.target.value;
                      }
                    }}
                    type="text"
                    placeholder="Phone Number"
                  />
                </ul>
              )}
            </ul>
            <br />
            <br />
            {show && (
              <Button
                onClick={() => {
                  updateUser();
                  setShow(false);
                }}
              >
                Update
              </Button>
            )}
          </div>
          <div className="right-side">
            <Card
              style={{ height: "100%", width: "80%" }}
              className="bg-dark text-white"
            >
              <Card.Img src={url ? url : logo} alt="Card image" />
            </Card>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
              }}
            >
              {" "}
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
              <button onClick={uploadImage}>Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;