class FetchAPI {
    constructor(headers, fetch) {
        this.headers = headers;
        this.fetch = fetch
    }

    async request(url, method, body, opts) {
        const options = {
            method,
            headers: this.headers,
            ...opts,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await this.fetch(url, options);

        if (!response.ok) {
            throw new Error(`Erreur lors de l'appel à l'API`);
        }

        return await response.json();
    }
}

module.exports = {FetchAPI};