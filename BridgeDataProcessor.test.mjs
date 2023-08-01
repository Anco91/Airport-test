const { BridgeDataProcessor } = require('./BridgeDataProcessor.cjs');

const fetchAPI = {
    request: jest.fn(),
};

const fs = {
    writeFileSync: jest.fn(),
};

const authResponseData = {
    "access_token": "test_access_token",
    "expires_at": "2023-08-01T17:17:37.106Z",
    "user": {
        "uuid": "a28e0b2f-264c-4503-b5f7-09d7e87e95d3",
        "email": "john.doe@email.com"
    }
};

const itemsResponseData = {
    resources: [
        {
            "id": 6648847,
            "status": 0,
            "status_code_info": null,
            "status_code_description": null,
            "bank_id": 408
        }
    ],
    pagination: {
        next_uri: null,
    },
};

const accountsResponseData = {
    resources: [
        {
            "id": 30179394,
            "name": "Compte Crédit Immobilier",
            "balance": 140200.0,
            "status": 0,
            "status_code_info": null,
            "status_code_description": null,
            "updated_at": "2022-04-22T14:53:00.200Z",
            "type": "loan",
            "is_paused": false,
            "currency_code": "EUR",
            "item_id": 6648847,
            "bank_id": 408,
            "loan_details": {
                "next_payment_date": null,
                "next_payment_amount": 2000.0,
                "maturity_date": "2022-05-22",
                "opening_date": "2020-04-22",
                "interest_rate": 1.2,
                "type": null,
                "borrowed_capital": 500000.0,
                "repaid_capital": 24000.0,
                "remaining_capital": 476000.0,
                "total_estimated_interests": 6441.9071367778815
            },
            "savings_details": null,
            "is_pro": false,
            "iban": null
        },
        {
            "id": 30179393,
            "name": "Compte Titres",
            "balance": 8700.0,
            "status": 0,
            "status_code_info": null,
            "status_code_description": null,
            "updated_at": "2022-04-22T14:52:59.192Z",
            "type": "brokerage",
            "is_paused": false,
            "currency_code": "EUR",
            "item_id": 6648847,
            "bank_id": 408,
            "loan_details": null,
            "savings_details": null,
            "is_pro": false,
            "iban": null
        }
    ],
    pagination: {
        next_uri: null,
    },
};

const transactionsResponseData = {
    resources: [
        {
            "id": 38000784535997,
            "clean_description": "Achat De Titres",
            "bank_description": "ACHAT DE TITRES - 260422",
            "amount": -1693.0,
            "date": "2022-04-26",
            "updated_at": "2022-04-22T14:53:00.048Z",
            "currency_code": "EUR",
            "category_id": 85,
            "account_id": 30179393,
            "show_client_side": true,
            "is_deleted": false,
            "is_future": true
        },
        {
            "id": 38000784535885,
            "clean_description": "Retraite",
            "bank_description": "Retraite - 260422",
            "amount": 1733.0,
            "date": "2022-04-26",
            "updated_at": "2022-04-22T14:52:58.930Z",
            "currency_code": "EUR",
            "category_id": 279,
            "account_id": 30179391,
            "show_client_side": true,
            "is_deleted": false,
            "is_future": true
        }
    ],
    pagination: {
        next_uri: null,
    },
};

describe('BridgeDataProcessor', () => {
    test('processAndSaveData', async () => {
        
        fetchAPI.request.mockImplementation((url) => {
            if (url === 'https://api.bridgeapi.io/v2/authenticate') {
                return authResponseData;
            } else if (url === 'https://api.bridgeapi.io/v2/items') {
                return itemsResponseData;
            } else if (url.startsWith('https://api.bridgeapi.io/v2/accounts')) {
                return accountsResponseData;
            } else if (url === 'https://api.bridgeapi.io/v2/transactions?limit=2') {
                return transactionsResponseData;
            } else {
                throw new Error('Invalid URL');
            }
        });

        
        const dataProcessor = new BridgeDataProcessor(fs, {}, {}, fetchAPI);
        await dataProcessor.processAndSaveData();

        
        expect(fs.writeFileSync).toHaveBeenCalledWith(
            'result.json',
            JSON.stringify({
                access_token: {
                    value: 'test_access_token',
                    expires_at: '2023-08-01T17:17:37.106Z',
                },
                items: [
                    {  
                        item: itemsResponseData.resources[0],
                        accounts: accountsResponseData.resources,
                    },
                ],
                transactions: transactionsResponseData.resources,
            }, null, 2)
        );
    });
});