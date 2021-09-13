import fakeData from './mockData';

class FakeInternalAPI {
	base_url = 'https://incominginvoices.uds.systems';
	delay = 1000;

	getBankAccountsFn = (substitutorId) => {
		let result = {};

		switch (substitutorId) {
			case "5adb6708-fe11-e611-80c6-000d3a23a1dc":
				result.Cooperatives = fakeData.Balances.Cooperatives.slice(8, 12);
				return result;

			case "19c0f96c-5533-e911-810f-005056ac126a":
				result.Cooperatives = fakeData.Balances.Cooperatives.slice(13, 18);
				return result;

			case "d9977306-9280-e611-8103-005056ac5819":
				result.Cooperatives = fakeData.Balances.Cooperatives.slice(19, 1000);
				return result;

			default:
				return fakeData.Balances;
		}
	}

	getCooperatives = (substitutorId) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const { Cooperatives } = this.getBankAccountsFn(substitutorId);
				resolve({
					IsSuccess: true,
					Error: 'Some error',
					ErrorCode: 0,
					Cooperatives
				});
			}, this.delay);
		})
	}

	getInvoicesForReport = (payerId, date, substitutorId = null) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					IsSuccess: true,
					Error: '',
					ErrorCode: 0,
					LA2900TotalAmount: -70838.84,
					PurchaseInvoices: [
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Howden Finland Oy",
							"DueDate": "2020-12-02T00:00:00+02:00",
							"Amount": 728.27,
							"InvoiceNumber": "321084",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-02T00:00:00+02:00",
							"AccountingDate": "2020-11-02T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=051c5ec7-f42a-eb11-810e-005056ac5877&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "051c5ec7-f42a-eb11-810e-005056ac5877",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "051c5ec7-f42a-eb11-810e-005056ac5877",
							"Name": "321084"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Kiinteistö-Tahkola Oulu Oy",
							"DueDate": "2020-11-21T00:00:00+02:00",
							"Amount": 31,
							"InvoiceNumber": "97054193",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "62ed235d-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-19T00:00:00+02:00",
							"AccountingDate": "2020-11-20T02:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=9cb287be-c433-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "9cb287be-c433-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "9cb287be-c433-eb11-817e-005056bbf149",
							"Name": "97054193"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Viria Security Oy",
							"DueDate": "2020-11-27T00:00:00+02:00",
							"Amount": 276.4,
							"InvoiceNumber": "10589324",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-13T00:00:00+02:00",
							"AccountingDate": "2020-11-13T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=93db5441-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "93db5441-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "93db5441-c533-eb11-817e-005056bbf149",
							"Name": "10589324"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Korpisähkö Oy",
							"DueDate": "2020-12-01T00:00:00+02:00",
							"Amount": 407.86,
							"InvoiceNumber": "143850",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-24T00:00:00+02:00",
							"AccountingDate": "2020-11-24T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=99db5441-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "99db5441-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "99db5441-c533-eb11-817e-005056bbf149",
							"Name": "143850"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Oomi Palvelut Oy",
							"DueDate": "2020-12-03T00:00:00+02:00",
							"Amount": 29.03,
							"InvoiceNumber": "2004253216",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-12T00:00:00+02:00",
							"AccountingDate": "2020-11-12T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=9fdb5441-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "9fdb5441-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "9fdb5441-c533-eb11-817e-005056bbf149",
							"Name": "2004253216"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "DNA Welho Oy",
							"DueDate": "2020-12-04T00:00:00+02:00",
							"Amount": 24.66,
							"InvoiceNumber": "77360720",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-05T00:00:00+02:00",
							"AccountingDate": "2020-11-05T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=a5db5441-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "a5db5441-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "a5db5441-c533-eb11-817e-005056bbf149",
							"Name": "77360720"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Kiinteistöhuolto Jurvelin Oy",
							"DueDate": "2020-12-06T00:00:00+02:00",
							"Amount": 127.88,
							"InvoiceNumber": "145284",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-26T00:00:00+02:00",
							"AccountingDate": "2020-11-26T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=abdb5441-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "abdb5441-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "abdb5441-c533-eb11-817e-005056bbf149",
							"Name": "145284"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "RTJ Group Oy / Ropo Laskutuspalvelu",
							"DueDate": "2020-12-14T00:00:00+02:00",
							"Amount": 83.08,
							"InvoiceNumber": "8074",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-30T00:00:00+02:00",
							"AccountingDate": "2020-11-30T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=4e365647-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "4e365647-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "4e365647-c533-eb11-817e-005056bbf149",
							"Name": "8074"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Kiinteistöhuolto Jurvelin Oy",
							"DueDate": "2020-12-10T00:00:00+02:00",
							"Amount": 298.94,
							"InvoiceNumber": "145605",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-30T00:00:00+02:00",
							"AccountingDate": "2020-11-30T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=54365647-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "54365647-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "54365647-c533-eb11-817e-005056bbf149",
							"Name": "145605"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Kiinteistöhuolto Jurvelin Oy",
							"DueDate": "2020-12-10T00:00:00+02:00",
							"Amount": 188.79,
							"InvoiceNumber": "145681",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-30T00:00:00+02:00",
							"AccountingDate": "2020-11-30T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=5a365647-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "5a365647-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "5a365647-c533-eb11-817e-005056bbf149",
							"Name": "145681"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Kiinteistöhuolto Paavo Sarkkinen Oy",
							"DueDate": "2020-12-13T00:00:00+02:00",
							"Amount": 173.6,
							"InvoiceNumber": "8184",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-12-01T00:00:00+02:00",
							"AccountingDate": "2020-12-01T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=60365647-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "60365647-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "60365647-c533-eb11-817e-005056bbf149",
							"Name": "8184"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Alltime Kiinteistöhuolto Oy",
							"DueDate": "2020-12-15T00:00:00+02:00",
							"Amount": 409.99,
							"InvoiceNumber": "25-10635",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-12-01T00:00:00+02:00",
							"AccountingDate": "2020-12-01T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=78365647-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "78365647-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "78365647-c533-eb11-817e-005056bbf149",
							"Name": "25-10635"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Oulun kaupunki",
							"DueDate": "2020-12-21T00:00:00+02:00",
							"Amount": 1643.95,
							"InvoiceNumber": "20122782",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-30T00:00:00+02:00",
							"AccountingDate": "2020-11-30T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=874e544d-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "874e544d-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "874e544d-c533-eb11-817e-005056bbf149",
							"Name": "20122782"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Oulun kaupunki",
							"DueDate": "2020-12-21T00:00:00+02:00",
							"Amount": 1282.5,
							"InvoiceNumber": "20124242",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-30T00:00:00+02:00",
							"AccountingDate": "2020-11-30T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=8d4e544d-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "8d4e544d-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "8d4e544d-c533-eb11-817e-005056bbf149",
							"Name": "20124242"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Asunto-osakeyhtiö Kontiohovi",
							"DueDate": "2020-11-30T00:00:00+02:00",
							"Amount": 241.32,
							"InvoiceNumber": "271120",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-26T00:00:00+02:00",
							"AccountingDate": "2020-11-26T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=934e544d-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "934e544d-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "934e544d-c533-eb11-817e-005056bbf149",
							"Name": "271120"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Oulun kaupunki",
							"DueDate": "2020-12-21T00:00:00+02:00",
							"Amount": 1197.45,
							"InvoiceNumber": "20125369",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-30T00:00:00+02:00",
							"AccountingDate": "2020-11-30T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=a54e544d-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "a54e544d-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "a54e544d-c533-eb11-817e-005056bbf149",
							"Name": "20125369"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Mandatum Life Vuokratontit 1 Oy",
							"DueDate": "2020-12-30T00:00:00+02:00",
							"Amount": 54807.24,
							"InvoiceNumber": "9099040000000869",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-06-15T00:00:00+03:00",
							"AccountingDate": "2020-12-01T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=ad4e544d-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "ad4e544d-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "ad4e544d-c533-eb11-817e-005056bbf149",
							"Name": "9099040000000869"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Lukkopro Oy",
							"DueDate": "2020-12-04T00:00:00+02:00",
							"Amount": 26.4,
							"InvoiceNumber": "201041",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-20T00:00:00+02:00",
							"AccountingDate": "2020-11-20T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=b34e544d-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "b34e544d-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "b34e544d-c533-eb11-817e-005056bbf149",
							"Name": "201041"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Kiinteistöhuolto Jurvelin Oy",
							"DueDate": "2020-12-06T00:00:00+02:00",
							"Amount": 129.78,
							"InvoiceNumber": "145334",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-26T00:00:00+02:00",
							"AccountingDate": "2020-11-26T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=b94e544d-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "b94e544d-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "b94e544d-c533-eb11-817e-005056bbf149",
							"Name": "145334"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Kiinteistöhuolto Jurvelin Oy",
							"DueDate": "2020-12-06T00:00:00+02:00",
							"Amount": 164.47,
							"InvoiceNumber": "145329",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-26T00:00:00+02:00",
							"AccountingDate": "2020-11-26T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=b0915153-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "b0915153-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "b0915153-c533-eb11-817e-005056bbf149",
							"Name": "145329"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Suomen Vartijat / P Valvonta-avustaja Oy",
							"DueDate": "2020-12-07T00:00:00+02:00",
							"Amount": 209.46,
							"InvoiceNumber": "14564",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-23T00:00:00+02:00",
							"AccountingDate": "2020-11-23T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=b6915153-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "b6915153-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "b6915153-c533-eb11-817e-005056bbf149",
							"Name": "14564"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Huoltia Oy",
							"DueDate": "2020-12-07T00:00:00+02:00",
							"Amount": 377.02,
							"InvoiceNumber": "24540",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-30T00:00:00+02:00",
							"AccountingDate": "2020-11-30T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=bc915153-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "bc915153-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "bc915153-c533-eb11-817e-005056bbf149",
							"Name": "24540"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Oulun kaupunki",
							"DueDate": "2020-12-09T00:00:00+02:00",
							"Amount": 450,
							"InvoiceNumber": "76502826",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-18T00:00:00+02:00",
							"AccountingDate": "2020-11-18T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=c2915153-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "c2915153-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "c2915153-c533-eb11-817e-005056bbf149",
							"Name": "76502826"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Suomen valtio / Oikeusministeriö",
							"DueDate": "2020-11-24T00:00:00+02:00",
							"Amount": 515,
							"InvoiceNumber": "1550076763",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-17T00:00:00+02:00",
							"AccountingDate": "2020-11-17T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=d8915153-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "d8915153-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "d8915153-c533-eb11-817e-005056bbf149",
							"Name": "1550076763"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Kiinteistöhuolto Jurvelin Oy",
							"DueDate": "2020-11-29T00:00:00+02:00",
							"Amount": 67.88,
							"InvoiceNumber": "145100",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-19T00:00:00+02:00",
							"AccountingDate": "2020-11-19T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=de915153-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "de915153-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "de915153-c533-eb11-817e-005056bbf149",
							"Name": "145100"
						},
						{
							"Payer": {
								"Id": "a98ee91c-e3ea-e711-8105-005056ac5819",
								"Name": "As Oy Demotalo"
							},
							"Seller": "Pohjanmaan Siivous Oy",
							"DueDate": "2020-11-29T00:00:00+02:00",
							"Amount": 200,
							"InvoiceNumber": "23788",
							"BankAccounts": [
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": 87.49,
									"Balance": 87.49,
									"Description": "second",
									"LastUpdated": "2020-11-09T18:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "62ed235d-66f6-ea11-810e-005056ac5877",
									"Name": "FI0383183710016878"
								},
								{
									"Operator": {
										"Id": "446337be-e332-e611-80fd-005056ac2752",
										"Name": "Osuuspankki (OKOYFIHH)"
									},
									"Limit": 0,
									"AllowedBalance": null,
									"Balance": -103.68,
									"Description": null,
									"LastUpdated": "2020-11-05T00:00:00+02:00",
									"IsMain": false,
									"Link": null,
									"Id": "03739f96-66f6-ea11-810e-005056ac5877",
									"Name": "FI6850000120350201"
								},
								{
									"Operator": {
										"Id": "386337be-e332-e611-80fd-005056ac2752",
										"Name": "Danske Bank (DABAFIHH)"
									},
									"Limit": null,
									"AllowedBalance": null,
									"Balance": null,
									"Description": null,
									"LastUpdated": null,
									"IsMain": false,
									"Link": null,
									"Id": "87195a45-9938-eb11-817e-005056bbf149",
									"Name": "FI0383183710016878"
								}
							],
							"BuyerBankAccountId": "03739f96-66f6-ea11-810e-005056ac5877",
							"InvoiceStatus": {
								"Value": 100000000,
								"Label": "Not paid"
							},
							"PaymentDate": null,
							"InvoiceDate": "2020-11-15T00:00:00+02:00",
							"AccountingDate": "2020-11-15T00:00:00+02:00",
							"Comment": null,
							"RejectComment": null,
							"AllowedPay": false,
							"AllowedEdit": true,
							"Link": "/main.aspx?etn=invoice&id=e4915153-c533-eb11-817e-005056bbf149&pagetype=entityrecord",
							"Validation": [
								{
									"EntityId": "e4915153-c533-eb11-817e-005056bbf149",
									"ResponseCode": 3,
									"Message": "Not all required fields (Operator, Bank ID) are filled in the Payer Bank Account",
									"MessageCode": 101
								}
							],
							"Id": "e4915153-c533-eb11-817e-005056bbf149",
							"Name": "23788"
						}
					]
				})
			}, this.delay)
		})
	}

	getPurchaseInvoicesFn = (substitutorId) => {
		let result = {
			IsSuccess: true,
			Error: 'Something went wrong, please reload the page',
			ErrorCode: 0
		};
		switch (substitutorId) {
			case "5adb6708-fe11-e611-80c6-000d3a23a1dc":
				result.PurchaseInvoices = fakeData.PurchaseInvoices.PurchaseInvoices;
				return result;

			case "19c0f96c-5533-e911-810f-005056ac126a":
				result.PurchaseInvoices = fakeData.PurchaseInvoices.PurchaseInvoices;
				return result;

			case "d9977306-9280-e611-8103-005056ac5819":
			case "19c83fec-7f33-e611-8100-005056ac126a":
				result.PurchaseInvoices = fakeData.PurchaseInvoices.PurchaseInvoices;
				return result;

			default:
				result.PurchaseInvoices = fakeData.PurchaseInvoices.PurchaseInvoices;
				return result;
		}
	}

	getPurchaseInvoices = (substitutorId) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const res = this.getPurchaseInvoicesFn(substitutorId);
				resolve(res);
			}, this.delay);
		})
	}

	getPaidInvoices = (substitutorId) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const res = this.getPurchaseInvoicesFn(substitutorId);
				resolve(res);
			}, this.delay);
		})
	}

	getSubstitutors = () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					IsSuccess: true,
					Error: null,
					ErrorCode: 0,
					Substitutors: fakeData.FakeSubstitutors.Substitutors
				})
			}, this.delay);
		})
	}

	updateInvoiceBankAccount = async (invoiceId, bankAccountId) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let fakeResponse =
				{
					UpdateMessages: [this.fakeUpdateInvoice(invoiceId)]
				}

				resolve(fakeResponse);
			}, this.delay);
		})
	}

	// invoiceIds: []
	updateInvoicesAccountingDate = (invoiceIds, accountingDate) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				let fakeResponse =
				{
					IsSuccess: true,
					Error: null,
					ErrorCode: 0,
					UpdateMessages: []
				}

				for (let i = 0; i < invoiceIds.length; i++) {
					fakeResponse.UpdateMessages.push(this.fakeUpdateInvoice(invoiceIds[i]));
				}
				resolve(fakeResponse);
			}, this.delay)
		})

	}

	rejectInvoice = (invoiceId, comment) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				let fakeResponse =
				{
					IsSuccess: true,
					Error: null,
					ErrorCode: 0,
					UpdateMessages: [this.fakeUpdateInvoice(invoiceId)]
				}

				return resolve(fakeResponse);
			}, this.delay)
		})
	}

	payInvoices = (invoicesIds) => {
		return new Promise(resolve => {
			setTimeout(() => {
				return resolve(this.fakePayInvoice(invoicesIds))
			}, this.delay)
		})
	}

	fakePayInvoice = (invoicesId) => {
		let Responses = invoicesId.map((invoiceId, idx) => {
			const random = Math.random();
			let res = {
				EntityId: invoiceId,
				ResponseCode: random >= 0.75
					? 1
					: random < 0.75 && random >= 0.5
						? 2
						: random < 0.5 && random >= 0.25
							? 3
							: 4,
				Message: 'Please note than balance is not up to date for the following invoice (s)',
				MessageCode: idx === 0 ? 4 : 2
			}
			return res;
		})

		return {
			IsSuccess: true,
			Error: null,
			ErrorCode: 0,
			Responses
		};
	}

	fakeUpdateInvoice = (invoiceId) => {
		let result = {
			IsSuccess: true,
			Error: null,
			ErrorCode: 0,
			Id: invoiceId
		};

		if (Math.random() <= 0.7) {
			result.IsUpdated = true;
			result.Message = "ok";
		}
		else {
			result.IsUpdated = false;
			result.Message = Math.random() >= 0.5
				? "Update error: Action you are trying to do will affect closed period and is not allowed"
				: "Permission error: You don`t have rights";
		}

		return result;
	}

	checkBalanceDate = (invoicesIds) => {
		return new Promise(resolve => {
			setTimeout(() => {
				const random = Math.random();
				const res = {
					IsSuccess: true,
					Error: null,
					ErrorCode: 0,
					IsAllUpToDate: random > 0.3,
					Payers: invoicesIds.map(invoiceId => {
						return {
							Id: invoiceId,
							Name: 'PayerNamePayerNamePayerName'
						}
					}),
					InvoicesIds: [...invoicesIds]
				}
				resolve(res)
			}, this.delay)
		})
	}
}

export default new FakeInternalAPI();