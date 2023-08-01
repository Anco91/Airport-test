
class BridgeDataProcessor {
  constructor(fs, credentials, headers, fetchAPI) {
    this.credentials = credentials;

    this.headers = headers;
    
    this.fetchAPI = fetchAPI;

    this.fs = fs;
  }

  async authenticate() {
    try {
      const authResponse = await this.fetchAPI.request('https://api.bridgeapi.io/v2/authenticate', 'POST', this.credentials);
      return {access_token: authResponse.access_token, expires_at: authResponse.expires_at};
    } catch (error) {
      console.log(error);
      throw new Error('Erreur lors de l\'authentification à l\'API');
    }
  }

  async getItems(accessToken) {
    try {
      const itemsResponse = await this.fetchAPI.request('https://api.bridgeapi.io/v2/items', 'GET', null, {
        headers: {
          ...this.headers,
          Authorization: `Bearer ${accessToken}`
        }
      });
      return itemsResponse.resources;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des items');
    }
  }

  async getAccountsForItems(accessToken, items) {
    try {
      const accountsPromises = items.map(item => this.fetchAPI.request(`https://api.bridgeapi.io/v2/accounts?item_id=${item.id}`, 'GET', null, {
        headers: {
          ...this.headers,
          Authorization: `Bearer ${accessToken}`
        }
      }));

      const accountsResponses = await Promise.all(accountsPromises);
      return accountsResponses.map(response => response.resources);
    } catch (error) {
      throw new Error('Erreur lors de la récupération des comptes associés aux items');
    }
  }

  async getTransactions(accessToken) {
    try {
      const transactionsResponse = await this.fetchAPI.request('https://api.bridgeapi.io/v2/transactions?limit=2', 'GET', null, {
        headers: {
          ...this.headers,
          Authorization: `Bearer ${accessToken}`
        }
      });
      return transactionsResponse.resources;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des transactions');
    }
  }

  async processAndSaveData() {
    try {
      const {access_token: accessToken, expires_at: expiresAt} = await this.authenticate();
      const items = await this.getItems(accessToken);
      const accounts = await this.getAccountsForItems(accessToken, items);
      const transactions = await this.getTransactions(accessToken);

      const result = {
        access_token: {
          value: accessToken,
          expires_at: expiresAt
        },
        items: items.map((item, index) => ({ item, accounts: accounts[index] })),
        transactions
      };

      this.fs.writeFileSync('result.json', JSON.stringify(result, null, 2));
      console.log('Les résultats ont été enregistrés dans le fichier "result.json".');
    } catch (error) {
      console.error('Une erreur est survenue:', error.message);
    }
  }
}

module.exports = {BridgeDataProcessor};