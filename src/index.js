import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*

API
    https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json
    https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json

Expo? https://snack.expo.io/@jtbolstaf/arrogant-french-fries

Proxy for CORS
    https://medium.com/@Pavan_/set-up-proxy-to-work-with-multiple-apis-in-create-react-app-be595a713eb2
Readme

Error handling
    error boundary
    if (!(status >= 200 && status < 300)) {

A11y: ARIA, semantisk markup

UseReducer?

Security

Structure:
    Components/containers?

Types?

Map?

Tests

*/
