import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({ stations: [], status: [] });

  useEffect(() => {
    async function fetchData() {
      // Using CRA's proxy to avoid CORS issues (see package.json)
      const apiEndpoints = [
        "/oslobysykkel.no/station_information.json",
        "/oslobysykkel.no/station_status.json"
      ];

      const options = {
        // Identifying header ref API readme
        headers: {
          "client-name": "jtbolstad-bikes"
        }
      };

      const [stations, status] = await Promise.all(
        apiEndpoints.map(async url => {
          let response = await fetch(url, options);

          if (!response.ok || !response.json) {
            console.log('response', response);
            throw new Error(`${response.status} ${response.statusText}`);
          }

          let responseJson = await response.json();
          return responseJson.data && responseJson.data.stations ? responseJson.data.stations : {};  
        })
      );
      setData({ stations, status });
    }
    fetchData();
  }, []);

  const Row = ({ id }) => {
    // Could use a map/object with id as keys for faster lookups
    const station = data.stations.find(station => station.station_id === id);
    const status = data.status.find(status => status.station_id === id);

    return (
      <tr>
        <td>{station.name}</td>
        <td>{status.num_bikes_available}</td>
        <td>{status.num_docks_available}</td>
        <td>
          {/* Just adding a map link for my own interest/curiosity */}
          <a
            href={`http://maps.google.com/maps?q=${station.lat}+${station.lon}&ll=${station.lat},${station.lon}&spn=0.004250,0.011579&t=h&iwloc=A&hl=en`}
          >
            Vis
          </a>
        </td>
      </tr>
    );
  };

  const dataRows = data.stations.map(station => (
    <Row key={station.station_id} id={station.station_id}></Row>
  ));

  const dataTable = (
    <table>
      <thead>
        <tr>
          <td>Navn</td>
          <td>Ledige sykler</td>
          <td>Ledige plasser</td>
          <td>Kart</td>
        </tr>
      </thead>
      <tbody>
      {dataRows}
      </tbody>
    </table>
  );

  return <div className="App">{dataTable}</div>;
}

export default App;
