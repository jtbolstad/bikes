const config = {
  // Key must be added for the map to run in normal mode (not develop mode)
  googleMapsApiKey: "",
  // Using a local proxy to avoid CORS (see package.json)
  apiEndpoints: [
    "/oslobysykkel.no/station_information.json",
    "/oslobysykkel.no/station_status.json"
  ],
  // Minutes between update
  updateInterval: 5,
  // Identifying header ref API info
  options: {
    headers: {
      "client-name": "jtbolstad-bikes"
    }
  }
};

export default config;
