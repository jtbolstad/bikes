import fetchMock from 'fetch-mock';
import fetchData from './fetchData.js';

describe('Merge stations and status responses', () => {
	it('can fetch data from two endpoints and merge them', async () => {

		const responseStations = { data: {stations: [{station_id: 1, name:'a', lon:1, lat: 2}]}};
		const responseStatus = {data: {stations: [{station_id: 1, num_bikes_available: 1, num_docks_available: 1}]}};
		fetchMock.mock('/stations', JSON.stringify(responseStations));
		fetchMock.mock('/status', JSON.stringify(responseStatus));

		const response = await fetchData(['/stations', '/status']);
		const expected = {1:{station_id: 1, name:'a', lon:1, lat: 2, num_bikes_available: 1, num_docks_available: 1}};
		
		expect(fetchMock.called()).toBe(true);
		expect(fetchMock.calls().length).toBe(2);
		expect (response).toEqual(expected);
		
		fetchMock.restore();
	});

	it('can fail if response fails', async () => {
		fetchMock.mock('/badUrl', {
			status: 503,
			throws: new Error('Failed to fetch'),
			ok: false
		})
		await expect(fetchData(['/badUrl', '/badUrl'])).rejects.toEqual(Error('Failed to fetch'));
	});
})
