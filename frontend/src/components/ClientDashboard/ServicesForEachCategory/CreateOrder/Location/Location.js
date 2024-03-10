import React, { useContext, useState } from "react";
import GoogleMapReact from "google-map-react";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { LoginContext } from "../../../../../App";
import logo from "../../../../images/logo3.png";
import "./location.css";
const Location = (props) => {
  const { userId, token } = useContext(LoginContext);
  const [status, setStatus] = useState(null);
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          props.setLat(position.coords.latitude);
          props.setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  const defaultProps = {
    center: {
      lat: props.lat,
      lng: props.lng,
    },
    zoom: 16,
  };

  const AnyReactComponent = ({ zoom }) => {
    const pinSize = zoom <= 13 ? "25px" : "35px";

    return (
      <div className="test">
        <img
          src="https://cdn-icons-png.flaticon.com/512/484/484167.png"
          className="pin"
          style={{
            height: { pinSize },
            width: { pinSize },
          }}
          alt="pin"
        />
      </div>
    );
  };

  return (
    <div style={props.lat && { height: "50vh" }}>
      {props.lat && (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyAZTsJ09SYo2PKzsR8sjk9jDgWMN8ltAZs",
            language: "en",
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <AnyReactComponent
            lat={props.lat}
            lng={props.lng}
            zoom={defaultProps.zoom}
          />
        </GoogleMapReact>
      )}

      <div className="Location">
        <Button
          onClick={() => {
            props.setLat(null);
            props.setLng(null);
            getLocation();
          }}
        >
          Get your Location
        </Button>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default Location;
