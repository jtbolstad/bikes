export const fetchData = async (URLs, options) => {
  const [stations, status] = await Promise.all(
    URLs.map(async url => {
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
  return zip(stations, status);
}

export const zip = (stations, status) => {
  const stationsWithStatus = {};
  stations.forEach(station => {
    stationsWithStatus[station.station_id] = {
      ...station,
      ...status.find(status => station.station_id === status.station_id)
    };
  });
  return stationsWithStatus;
}
