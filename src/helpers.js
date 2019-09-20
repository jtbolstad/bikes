export const fetchData = async (URLs, options) => {
  const [stations, status] = await Promise.all(
    URLs.map(async url => {
      const response = await fetch(url, options);
      // console.log('response', response)
      const tmp = response.clone();
      const tmp2 = await tmp.json();
      // console.log('tmp2', tmp2);
      // console.log('tmp.json', tmp.json);
      // console.log('tmp.json()', tmp.json());
      if (!response.ok || !response.json) {
        // console.log("response", response);
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const responseJson = await response.json();

      return responseJson.data && responseJson.data.stations
        ? responseJson.data.stations
        : [];
    })
  );
  // console.log('stations', stations);
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
