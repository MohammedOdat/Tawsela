import React, { useState, useContext, useEffect } from "react";
import ShowLocation from "./ShowLocation/ShowLocation";
import "./MyOrders.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { LoginContext } from "../../../App";
function MyVerticallyCenteredModal(props) {
  const { token } = useContext(LoginContext);
  const [delivery, setDelivery] = useState(null);
  const [price, setPrice] = useState(0);
  const [show, setShow] = useState(false);
  const [resFromeBack, setResFromeBack] = useState("");
  const updatePrice = (id) => {
    axios
      .put(
        `http://localhost:5000/orders/${id}`,
        { price: price, state: "pending" },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        setResFromeBack({
          message: "Successfuly Sent (Waiting A Response)",
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setResFromeBack(err.response.data);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Set Your Price
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.units !== 0 && (
          <>
            {" "}
            <h6>Price Of Units:</h6>
            <p>{props.units * 7} JD</p>
          </>
        )}

        <h6>Your Delivery Price:</h6>
        <input
          onChange={(e) => {
            setDelivery(e.target.value);
            setPrice(props.units * 7 - -1 * e.target.value);
          }}
          style={{ paddingLeft: "3px" }}
          type="number"
          placeholder="JD"
          min={1}
        />
        <h6>Total:</h6>
        <p>{price} JD</p>
      </Modal.Body>
      <Modal.Footer
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          {" "}
          {resFromeBack.success ? (
            <p style={{ color: "green" }}>{resFromeBack.message}</p>
          ) : (
            <p style={{ color: "red" }}>{resFromeBack.message}</p>
          )}
        </div>
        <div>
          {" "}
          <Button
            onClick={() => {
              updatePrice(props.id);
            }}
          >
            Send
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
const MyOrders = ({ state }) => {
  const { token, userId, setUserId, isLoggedIn, role, setRole } =
    useContext(LoginContext);
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);
  const [modalShow, setModalShow] = React.useState(false);
  const [units, setUnits] = useState(null);
  const [id, setId] = useState("");
  const [id_1, setId_1] = useState("");
  const [show, setShow] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [orderId1, setOrderId1] = useState(null);

  const getAllOrders = () => {
    setLoader(true);
    axios
      .get(`http://localhost:5000/orders/provider/${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.data.success) {
          const filtred = result.data.services.filter((ele, i) => {
            return ele.state === state;
          });
          setOrders(filtred);
          setLoader(false);
        } else {
          setOrders([]);
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  useEffect(() => {
    getAllOrders();
  }, [state]);
  const rejectOrder = (id) => {
    const newOrders = orders.filter((ele, i) => {
      return ele._id != id;
    });
    setOrders(newOrders);
    axios.delete(`http://localhost:5000/orders/${id}`);
  };
  const updateOrder = (id) => {
    axios
      .put(
        `http://localhost:5000/orders/${id}`,
        { state: "completed" },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        getAllOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="Orders-Page">
      {loader ? (
        <div className="loader"></div>
      ) : (
        <div className="Orders">
          {orders.length != 0 ? (
            orders.map((ele, i) => (
              <div className="order">
                <div className="Name-State">
                  <p>Client: {ele.client.firstName}</p>
                  <p>{ele.state}</p>
                </div>
                <div className="phone-res">
                  <div className="PhoneNumber">{ele.client.phoneNumber}</div>
                  {state === "pending" && (
                    <div>
                      <Button
                        onClick={() => {
                          setUnits(ele.units);
                          setId(ele._id);
                          setModalShow(true);
                        }}
                        variant="success"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => {
                          rejectOrder(ele._id);
                        }}
                        variant="danger"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {" "}
                  {ele.units !== 0 && (
                    <div>Number Of Cylinder : {ele.units} cyl</div>
                  )}
                  {ele.notes && (
                    <div>
                      Notes:
                      <p
                        style={{
                          border: "1px solid",
                          borderRadius: "7px",
                          padding: "5px",
                        }}
                      >
                        {ele.notes}
                      </p>
                    </div>
                  )}
                  {showLocation && orderId1 === ele._id && (
                    <ShowLocation orderId={ele._id} />
                  )}
                  <Button
                    onClick={() => {
                      setShowLocation(!showLocation);
                      setOrderId1(ele._id);
                    }}
                  >
                    {showLocation && orderId1 === ele._id ? "Hide" : "Show"}{" "}
                    Client Location
                  </Button>
                  <br />
                </div>
                {state === "processing" && (
                  <div
                    style={
                      show && id_1 === ele._id
                        ? { display: "flex", justifyContent: "space-between" }
                        : { display: "flex", justifyContent: "flex-end" }
                    }
                  >
                    {show && id_1 === ele._id && (
                      <div style={{ color: "red" }}>
                        <h4>Collect Cash : {ele.price} JD</h4>
                      </div>
                    )}
                    <Button
                      onClick={() => {
                        show && id_1 === ele._id && updateOrder(ele._id);
                        setShow(!show);
                        show || setId_1(ele._id);
                        setShow(!show);
                      }}
                      variant={show && id_1 === ele._id ? "success" : "primary"}
                    >
                      {show && id_1 === ele._id ? "Collect" : "Complete"}
                    </Button>
                  </div>
                )}
                {state === "completed" && (
                  <div>Colected Cash : {ele.price} JD</div>
                )}
              </div>
            ))
          ) : (
            <p>No Order</p>
          )}
        </div>
      )}

      <MyVerticallyCenteredModal
        id={id}
        orders={orders}
        units={units}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
export default MyOrders;
