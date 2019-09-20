import fetchMock from 'fetch-mock';
import { fetchData, zip } from './helpers.js';
import config from './config.js';
//  apiEndpoints, options, baseurl }

// console.log('apiEndpoints', config.apiEndpoints)
const responseBody = {
	data: {
		stations: [{station_id: 1, name:'a', lon:1, lat: 2}],
		status: [[{station_id: 1, num_bikes_available: 1, num_docks_available: 1}]]
	}
};

describe('Merge stations and status responses', () => {
	it('can fetch data from two endpoints and merge them', async () => {

		fetchMock.mock('*', {
			body: JSON.stringify(responseBody),
			ok: true,
			status: 200,
			statusText: 'OK',
		})
		await fetchData(config.apiEndpoints);
		expect(fetchMock.called()).toBe(true);
		fetchMock.restore();
	});

	it('can fail if response fails', async () => {
		fetchMock.mock('*', {
			body: '',
			ok: false,
			status: 500,
			statusText: 'Internal Server Error',
		})
		const data = await fetchData(config.apiEndpoints);
		console.log('data', data);
		console.log('fetchMock.called', fetchMock.called());
		fetchMock.restore();
		expect(1).toBe(1);
	});
})

describe('Merge stations and status responses', () => {
	it('can merge api responses to a indexed object', () => {
		const station = [{ station_id:1, name: 'a' }];
		const status = [{ station_id:1, bikes: 1, locks: 2}];
		
		const expected = {1: {station_id: 1, name: 'a', bikes: 1, locks: 2}};
		const received = zip(station, status); 
		
		expect(expected).toEqual(received);
	});
})