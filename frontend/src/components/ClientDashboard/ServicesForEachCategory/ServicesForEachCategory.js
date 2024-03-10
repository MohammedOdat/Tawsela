import React, { useContext, useState } from "react";
import { ClientContext } from "../ClientDashboard";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CreateOrder from "./CreateOrder/CreateOrder";
import logo from "../../images/user1.jpg";
const ServicesForEachCategory = () => {
  const { users } = useContext(ClientContext);
  const [name, setName] = useState("");
  const [providerId, setProviderId] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  return users.length
    ? users.map((ele, i) => (
        <div>
          {" "}
          <Card
            style={{ width: "13rem", height: `19rem` }}
            className="text-center"
          >
            <div style={{height:"10rem"}}><Card.Img variant="top" src={ele.image ? ele.image : logo} /></div>
            <Card.Body>
              <Card.Title>{ele.firstName}</Card.Title>
              <Card.Text style={{ textAlign: "left" }}>
                {ele.phoneNumber}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  setName(ele.firstName);
                  setModalShow(ele._id);
                }}
              >
                Order Now
              </Button>
              <CreateOrder
                service={ele.serviceType}
                name={name}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </Card.Body>
          </Card>
        </div>
      ))
    : "NO Content";
};

export default ServicesForEachCategory;
