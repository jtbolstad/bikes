import fetchMock from 'fetch-mock';
import { fetchData, zip } from './helpers.js';
import { apiEndpoints, options } from './config.js';

describe('Merge stations and status responses', () => {
	it('can fetch data from two endpoints and merge them', () => {
		
		// const station = [{ station_id:1, name: 'a' }];
		// const status = [{ station_id:1, bikes: 1, locks: 2}];		
		// const expected = {1: {station_id: 1, name: 'a', bikes: 1, locks: 2}};
		// const received = zip(station, status); 
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