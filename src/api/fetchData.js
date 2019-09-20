import zip from '../utils/zip.js';

const fetchData = async (URLs, options) => {
  const [stations, status] = await Promise.all(
    URLs.map(async url => {
      const response = await fetch(url, options);
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

export default fetchData;