const config = {
    baseurl: 'http://localhost:3000',
    // Using a local proxy to avoid CORS (see package.json)
    apiEndpoints: [
        "/oslobysykkel.no/station_information.json",
        "/oslobysykkel.no/station_status.json"
    ],
    options: {
        headers: {
            // Identifying header ref API info
            "client-name": "jtbolstad-bikes"
        }
    }
};

export default config;