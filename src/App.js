import React, { useState, useEffect } from "react";
import "./App.css";
import BikeMap from "./BikeMap.js";
import config from './config.js';
import { fetchData } from './helpers.js';

const App = () => {
  const [stationsWithStatus, setStations] = useState({});
  const [updateTime, setUpdateTime] = useState(new Date());

  useEffect(() => {
    const main = async () => {
      const stationsWithStatus = await fetchData(config.apiEndpoints, config.options);
      setStations(stationsWithStatus);
      setUpdateTime(new Date().toTimeString().substr(0,8));    
      const inter = setInterval(fetchData, 1000 * 60 * 5); // Updates every 5 minutes
      return () => clearInterval(inter);
    }
    main();
  }, []);

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
