import React, { useContext, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
const Location = (props) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/orders/${props.orderId}`)
      .then((result) => {
        setLat(result.data.orders[0].location[0]);
        setLng(result.data.orders[0].location[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  const defaultProps = {
    center: {
      lat: Number(lat),
      lng: Number(lng),
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
    <div style={lat && { height: "50vh" }}>
      {lat && (
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
            lat={Number(lat)}
            lng={Number(lng)}
            zoom={defaultProps.zoom}
          />
        </GoogleMapReact>
      )}
    </div>
  );
};

export default Location;
