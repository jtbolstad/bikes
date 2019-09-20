import zip from '../utils/zip.js';

describe('zip: Merge stations and status responses', () => {
	it('can merge api responses to a indexed object', () => {
		const station = [{ station_id:1, name: 'a' }];
		const status = [{ station_id:1, bikes: 1, locks: 2}];
		
		const expected = {1: {station_id: 1, name: 'a', bikes: 1, locks: 2}};
		const received = zip(station, status); 
		
		expect(expected).toEqual(received);
	});
})