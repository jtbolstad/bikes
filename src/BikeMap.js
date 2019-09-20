import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import config from './config.js';

const BikeMap = ({ stationsWithStatus, google }) => {
  // Limit map view to stations
  var bounds = new google.maps.LatLngBounds();

  const stations = Object.values(stationsWithStatus).map(
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
    // Include station in map view
    bounds.extend(pos);  
    
    const bikeText = station.bikes === 1 ? 'sykkel' : 'sykler';
    const lockText = station.locks === 1 ? 'lås' : 'låser';
    
    return (
      <Marker
        key={i}
        position={pos}
        title={`${station.name}: ${station.bikes} ${bikeText}, ${station.locks} ${lockText}`}
      ></Marker>)
  });

  // Data attribute is not applied by the map component. It is the preferred selector for testing.
  return (
    <Map
      className='bike-map'
      data-test='bike-map' 
      google={google}
      initialCenter={{ lat: 59.92, lng: 10.74}}
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
  apiKey: config.googleMapsApiKey
})(BikeMap);
