import fetchMock from 'fetch-mock';
import { fetchData } from "./App.js";

describe('test', () => {
    it('can', () => {
        fetchMock.mock('http://localhost:8081', 200);
        fetchData();
        fetchMock.restore();        // const fetch = () => Promise 
        expect(1).toBe(1);
    });    
});
