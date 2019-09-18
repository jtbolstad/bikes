import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const Kart = ({ stationsWithStatus, google }) => {
  // Limit map view to stations
  var bounds = new google.maps.LatLngBounds();

  const stations = [...stationsWithStatus.values()].map(
    ({ name, lat, lon, num_bikes_available, num_docks_available }) => ({
      name,
      lat,
      lon,
      bikes: num_bikes_available,
      locks: num_docks_available
    })
  );

  const markers = stations.map((station, i) => {
    const pos = { lat: station.lat, lng: station.lon };
    bounds.extend(pos);  // Include station in map view
    
    return (
      <Marker
        key={i}
        position={pos}
        title={`${station.name}: ${station.bikes} sykler, ${station.locks} låser`}
      />)
  });

  // Google Map
  // https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react

  // Add geolocation? Zoom to?

  return (
    <Map
      google={google}
      style={{ width: "100%", height: "100%" }}
      bounds={bounds}
    >
    {markers}
    </Map>
  );
};

export default GoogleApiWrapper({
  // fullstackreact: apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
  apiKey: "AIzaSyC2Z0xQIg8y3Nv_qtgb1yRGPN3kSjHfVQ4"
})(Kart);
