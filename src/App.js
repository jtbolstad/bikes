import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({ stations: [], status: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        // Using CRA's proxy to avoid CORS issues (see package.json)
        const apiEndpoints = [
          "/oslobysykkel.no/station_information.json",
          "/oslobysykkel.no/station_status.json"
        ];

        const headers = {
          // Identifying header ref API readme
          headers: {
            "client-name": "jt-bikeapp"
          }
        };

        const handleFetchResponse = response =>
          response.ok && response.json ? response.json() : null;

        const [stations, status] = await Promise.all(
          apiEndpoints.map(url =>
            fetch(url, headers)
              .then(handleFetchResponse)
              .then(response => response.data.stations)
          )
        );
        setData({ stations, status });
      } catch (err) {
        console.log("Error:", err);
      }
    }
    fetchData();
  }, []);

  const Row = ({ id }) => {
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
        {data.stations.map(station => (
          <Row key={station.station_id} id={station.station_id}></Row>
        ))}
      </tbody>
    </table>
  );

  return <div className="App">{dataTable}</div>;
}

export default App;
