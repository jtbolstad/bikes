import fetchMock from 'fetch-mock';
import { fetchData } from './';
import config from '../config.js';

const responseBody = {
	data: {
		stations: [{station_id: 1, name:'a', lon:1, lat: 2}],
		status: [[{station_id: 1, num_bikes_available: 1, num_docks_available: 1}]]
	}
};

describe('Merge stations and status responses', () => {
	it('can fetch data from two endpoints and merge them', async () => {

		fetchMock.get('*', {
			body: JSON.stringify(responseBody),
			ok: true,
			status: 200,
			statusText: 'OK',
		})
		const response = await fetchData(config.apiEndpoints);
		const result = await response.json();
		console.log('result', result);
		expect(fetchMock.called()).toBe(true);
		fetchMock.restore();
	});

	it('can fail if response fails', async () => {

		// https://codereviewvideos.com/course/react-redux-and-redux-saga-with-symfony-3/video/testing-javascript-s-fetch-with-jest-unhappy-paths

		fetchMock.get('http://bad.url', {
			body: '',
			ok: false,
			status: 500,
			statusText: 'Internal Server Error',
		})
		const data = await fetchData('http://bad.url');
		// console.log('data', data);
		// console.log('fetchMock.called', fetchMock.called());
		const response = await fetchData(config.apiEndpoints);
		const result = await response.json();
		expect(result).toThrow();
		fetchMock.restore();
	});
})
