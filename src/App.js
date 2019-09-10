import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [stationsWithStatus, setData] = useState(new Map());

  useEffect(() => {
    async function fetchData() {
      // Using CRA's proxy to avoid CORS (see package.json)
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

      const stationsWithStatus = new Map();
      stations.forEach(station => {
        stationsWithStatus.set(
          station.station_id, 
          {
            ...station,
            ...status.find(status => station.station_id === status.station_id)
          },
        )
      })
      setData(stationsWithStatus);
    }
    fetchData();
  }, []);

  const Row = ({ id }) => {
    const station = stationsWithStatus.get(id);
    return (
      <tr>
        <td>{station.name}</td>
        <td>{station.num_bikes_available}</td>
        <td>{station.num_docks_available}</td>
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

  const dataRows = [...stationsWithStatus.keys()].map(id => (
    <Row key={id} id={id}></Row>
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
