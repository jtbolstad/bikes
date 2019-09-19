import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import "./App.css";

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
    
    const sykler = station.bikes === 1 ? 'sykkel' : 'sykler';
    const låser = station.locks === 1 ? 'lås' : 'låser';
    
    return (
      <Marker
        key={i}
        position={pos}
        title={`${station.name}: ${station.bikes} ${sykler}, ${station.locks} ${låser}`}
      ></Marker>)
  });

  // Google Map
  // https://www.npmjs.com/package/google-maps-react
  // https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react

  // Add geolocation? Zoom to?

  return (
    <Map
      className="Mapp"
      google={google}
      bounds={bounds}
    >
    {markers}
    </Map>
  );
};

export default GoogleApiWrapper({
  // In a production app, this api key should be set in env. 
  // Maybe set env apikey when running .
  // https://www.rockyourcode.com/secret-keys-in-react 
  apiKey: "AIzaSyC2Z0xQIg8y3Nv_qtgb1yRGPN3kSjHfVQ4"
})(Kart);
