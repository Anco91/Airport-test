const {FetchAPI} = require('./FetchAPIClass.cjs');

const mockFetch = jest.fn();

const headers = {
  accept: 'application/json',
  'Bridge-Version': '2021-06-01',
  'content-type': 'application/json',
  'Client-Id': 'YOUR_CLIENT_ID',
  'Client-Secret': 'YOUR_CLIENT_SECRET',
};
const fetchAPI = new FetchAPI(headers, mockFetch);

describe('FetchAPI', () => {
  it('should call fetch with the correct arguments', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ data: 'dummy data' }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    const url = 'https://example.com/api/data';
    const method = 'GET';
    const body = { key: 'value' };
    const options = { option1: 'value1' };
    await fetchAPI.request(url, method, body, options);

    expect(mockFetch).toHaveBeenCalledWith(url, {
      method,
      headers,
      body: JSON.stringify(body),
      ...options,
    });
  });

  it('should throw an error on non-ok response', async () => {
    const mockResponse = {
      ok: false,
    };
    mockFetch.mockResolvedValue(mockResponse);

    const url = 'https://example.com/api/data';
    const method = 'GET';
    const body = { key: 'value' };

    await expect(fetchAPI.request(url, method, body)).rejects.toThrowError(
      'Erreur lors de l\'appel à l\'API'
    );
  });
});
