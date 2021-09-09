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