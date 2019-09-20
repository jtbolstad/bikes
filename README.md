# Bikes - a small app that consumes bysykkel-APIs.

### Prerequisites
Yarn (or Npm) must be installed.

Install dependencies by running yarn (or npm) in the repository folder.

Enter Google api key (sent by mail) in the config.js file. Without the api key, the map will run in develop mode.

### Run the app
In the project directory, run `yarn start` (or `npm start`).

This starts the app in the development mode, and should open it in a browser window.

If not, open [http://localhost:3000](http://localhost:3000) in a browser.

### Run unit/integration tests:

`yarn test` to start Majestic UI for running tests, then click Run tests when browser window with Majestic UI opens.
`yarn test:cli` to run tests with Jest in the command prompt/shell. Hit A to run all test.

### Run end-to-end tests with Cypress:

For testing, the app must run locally, so start it with 'yarn start'. Then start Cypress in one of these ways:
'yarn test:cypress' to run tests headless in the command prompt/shell (Electron).
'yarn test:cypress:gui' to open the interactive Cypress app (Electron).
'yarn test:cypress:chrome' to run the test in Chrome browser.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
