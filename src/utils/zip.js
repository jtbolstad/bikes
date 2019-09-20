const zip = (stations, status) => {
  const stationsWithStatus = {};
  stations.forEach(station => {
    stationsWithStatus[station.station_id] = {
      ...station,
      ...status.find(status => station.station_id === status.station_id)
    };
  });
  return stationsWithStatus;
}

export default zip;