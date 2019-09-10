import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({ stations: [], status: [] });

  const handleFetchResponse = response => {
    const hasError = !response.ok;
    const isLoading = false;
    return response.ok && response.json ? response.json() : data;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrls = [
          "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json",
          "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json"
        ];
        const [stations, status] = await Promise.all(
          apiUrls.map(url =>
            fetch(url)
              .then(res => res.json())
              .then(res => res.data.stations)
          )
        );
        setData({ stations, status });
      } catch (err) {
        console.log("Error:", err);
      }
    }
    fetchData();
  }, []);

  // USE THIS?
  // https://gist.github.com/bschwartz757/5d1ff425767fdc6baedb4e5d5a5135c8
  //   var requestAsync = function(url) {
  //     return new Promise((resolve, reject) => {
  //         var req = request(url, (err, response, body) => {
  //             if (err) return reject(err, response, body);
  //             resolve(JSON.parse(body));
  //         });
  //     });
  // };

  const Row = ({ id }) => {
    // TODO: Optimize this?
    const station = data.stations.find(station => station.station_id === id);
    const status = data.status.find(status => status.station_id === id);

    console.log("station", station);
    return (
      <tr>
        <td>{station.name}</td>
        <td>{status.num_bikes_available}</td>
        <td>{status.num_docks_available}</td>
        <td>
          <a
            href={`http://maps.google.com/maps?q=${station.lat}+${station.lon}&ll=${station.lat},${station.lon}&spn=0.004250,0.011579&t=h&iwloc=A&hl=en`}
            target="_blank"
          >
            Vis i kart
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

// {/* href={`https://www.google.com/maps/@${station.lat},${station.lon},14z?hl=no`} */}

// More verbose code:
// const stationsResponse = await fetch(
//   "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"
// );
// const statusResponse = await fetch(
//   "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json"
// );

// // Bail out if any request failed:
// if (!stationsResponse.ok || !statusResponse.ok) {
//   console.log("Request failed:");
//   console.log("Stations:" + stationsResponse.status);
//   console.log("Status:" + statusResponse.status);
//   return;
// }

// const stations = await stationsResponse.json();
// const status = await statusResponse.json();

// setData({
//   stations: stations.data.stations,
//   status: status.data.stations
// });

// console.log("stationsResponse", stationsResponse);
// console.log("statusResponse", statusResponse);
// const { stations } = await stationsResponse.json().data;
// const { status } = await statusResponse.json().data;
// console.log("stations", stations);
// console.log("status", status);
// {
//   headers: {
//     Accept: "application/json"
//     // "Content-Type": "application/json"
//   }
// }

//  console.log("data", data);
