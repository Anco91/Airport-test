const {FetchAPI} = require('./FetchAPIClass.cjs');

// Mock de la fonction fetch pour les tests
const mockFetch = jest.fn();

// Création d'une instance FetchAPI avec le mock de fetch
const headers = {
  accept: 'application/json',
  'Bridge-Version': '2021-06-01',
  'content-type': 'application/json',
  'Client-Id': 'YOUR_CLIENT_ID',
  'Client-Secret': 'YOUR_CLIENT_SECRET',
};
const fetchAPI = new FetchAPI(headers, mockFetch);

describe('FetchAPI', () => {
  // Test pour vérifier si la méthode request appelle correctement fetch avec les bons arguments
  it('should call fetch with the correct arguments', async () => {
    // Configurer le mock de fetch pour renvoyer une réponse factice
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ data: 'dummy data' }), // Réponse factice
    };
    mockFetch.mockResolvedValue(mockResponse);

    // Appeler la méthode request avec des valeurs factices
    const url = 'https://example.com/api/data';
    const method = 'GET';
    const body = { key: 'value' };
    const options = { option1: 'value1' };
    await fetchAPI.request(url, method, body, options);

    // Vérifier que fetch a été appelé avec les bons arguments
    expect(mockFetch).toHaveBeenCalledWith(url, {
      method,
      headers,
      body: JSON.stringify(body),
      ...options,
    });
  });

  // Test pour vérifier le cas d'erreur lorsque fetch renvoie une réponse non-ok
  it('should throw an error on non-ok response', async () => {
    // Configurer le mock de fetch pour renvoyer une réponse non-ok
    const mockResponse = {
      ok: false,
    };
    mockFetch.mockResolvedValue(mockResponse);

    // Appeler la méthode request
    const url = 'https://example.com/api/data';
    const method = 'GET';
    const body = { key: 'value' };

    // Vérifier que la méthode request lève une erreur
    await expect(fetchAPI.request(url, method, body)).rejects.toThrowError(
      'Erreur lors de l\'appel à l\'API'
    );
  });

  // Vous pouvez ajouter d'autres tests ici pour couvrir d'autres cas de fonctionnement

});
