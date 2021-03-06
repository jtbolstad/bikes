import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [stationsWithStatus, setData] = useState(new Map());

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
  }

  useEffect(() => {
    fetchData();
    const inter = setInterval(fetchData, 1000 * 60 * 10); // Updates every 10 minutes
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

  return <div className="App">{dataTable}</div>;
}

export default App;
