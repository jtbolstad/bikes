import React, { useState, useEffect } from "react";
import "./App.css";
import Kart from "./Kart.js";

const App = () => {
  const [stationsWithStatus, setData] = useState(new Map());
  const [updateTime, setUpdateTime] = useState(new Date());

  async function fetchData() {
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
    setData(stationsWithStatus);
    setUpdateTime(new Date());
  }

  useEffect(() => {
    fetchData();
    const inter = setInterval(fetchData, 1000 * 60 * 5); // Updates every 5 minutes
    return () => clearInterval(inter);
  }, []);

  const dataTableRows = Array.from(stationsWithStatus).map(([id, station]) => (
    <tr key={id}>
      <td>{station.name}</td>
      <td>{station.num_bikes_available}</td>
      <td>{station.num_docks_available}</td>
      <td>
        {/* Adding a map link for my own interest/curiosity */}
        <a
          href={`http://maps.google.com/maps?q=${station.lat}+${station.lon}&ll=${station.lat},${station.lon}&spn=0.004250,0.011579&t=h&iwloc=A&hl=en`}
        >
          Vis
        </a>
      </td>
    </tr>
  ));

  const dataTable = (
    <table>
      <thead>
        <tr>
          <td>Oslo Bysykkel: Stasjoner</td>
          <td>Ledige sykler</td>
          <td>Ledige låser</td>
          <td>Kart</td>
        </tr>
      </thead>
      <tbody>{dataTableRows}</tbody>
    </table>
  );
  console.log(updateTime);

  return (
    <div className="app">
      <Kart style={{marginTop: '20px'}} stationsWithStatus={stationsWithStatus} />
      <div className="oppdatert">Oslo Bysykkel: Ledige sykler og låser. 
        Oppdatert kl {updateTime.toTimeString().substr(0,5)}
        <div>Hold markøren over stasjonene for å se hvor mange sykler og låser som er ledige.</div>
      </div>
    </div>
  );
};

export default App;
