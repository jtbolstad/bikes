import React, { useState, useEffect } from "react";
import "./App.css";
import BikeMap from "./BikeMap.js";

let fetchData;

const App = () => {
  const [stationsWithStatus, setStations] = useState(new Map());
  const [updateTime, setUpdateTime] = useState(new Date());

  fetchData = async () => {
    // Using CRA's proxy to avoid CORS (see package.json)
    const apiEndpoints = [
      "/oslobysykkel.no/station_information.json",
      "/oslobysykkel.no/station_status.json"
    ];

    const options = {
      headers: {
        // Identifying header ref API info
        "client-name": "jtbolstad-bikes"
      }
    };

    const [stations, status] = await Promise.all(
      apiEndpoints.map(async url => {
        const response = await fetch(url, options);
        if (!response.ok || !response.json) {
          console.log("response", response);
          throw new Error(`${response.status} ${response.statusText}`);
        }

        const responseJson = await response.json();
        // Both requests return data.stations
        return responseJson.data && responseJson.data.stations
          ? responseJson.data.stations
          : {};
      })
    );

    const stationsWithStatus = new Map();
    stations.forEach(station => {
      stationsWithStatus.set(station.station_id, {
        ...station,
        ...status.find(status => station.station_id === status.station_id)
      });
    });
    setStations(stationsWithStatus);
    setUpdateTime(new Date().toTimeString().substr(0,8));
  }

  useEffect(() => {
    fetchData();
    const inter = setInterval(fetchData, 1000 * 60 * 5); // Updates every 5 minutes
    return () => clearInterval(inter);
  }, []);

  // exp = fetchData;

  return (
    <div className="app">
      <BikeMap stationsWithStatus={stationsWithStatus} />
      <div className="info-text">Oslo Bysykkel: Ledige sykler og låser. 
        <div>Hold markøren over stasjonene for å se hvor mange sykler og låser som er ledige.</div>
        <div>Oppdatert klokken <time dateTime={String(updateTime)}>{String(updateTime)}</time></div>
      </div>
    </div>
  );
};

export default App;
