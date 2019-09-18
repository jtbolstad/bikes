import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const Kart = ({ stationsWithStatus, google }) => {
  const stationlist = [...stationsWithStatus.values()].map(
    ({ name, lat, lon, num_bikes_available, num_docks_available }) => ({
      name,
      lat,
      lon,
      num_bikes_available,
      num_docks_available
    })
  );
  const stationList2 = stationlist.slice(0, 5);

  // Leafbag:

  const markers = stationList2.map((station, i) => (
    <Marker
      key={i}
      position={[station.lat, station.lon]}

    >
    </Marker>
  ));
  console.log("markers", markers);

  // React Leaflet
  // Typed example: https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/custom-component.js

  return (
    <Map center={[51.505, -0.09]} zoom={13}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  );
};

export default Kart;

// export default Kart;
