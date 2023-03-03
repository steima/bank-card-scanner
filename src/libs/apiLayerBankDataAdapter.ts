
export interface BankData {
    "bank_data": {
        "bank_code": string;
        "bic": string;
        "city": string;
        "name": string;
        "zip": string;
    },
    "country_iban_example": string;
    "iban": string;
    "iban_data": {
        "BBAN": string;
        "account_number": string;
        "bank_code": string;
        "branch": string;
        "checksum": string;
        "country": string;
        "country_code": string;
        "country_iban_format_as_regex": string;
        "country_iban_format_as_swift": string;
        "national_checksum": string;
        "sepa_country": boolean;
    },
    "valid": boolean;
}

class ApiLayerBankDataAdapter {

    async getBankData(iban: string): Promise<BankData> {
        const myHeaders = new Headers();
        myHeaders.append("apikey", "/* TODO put your api key here */");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        const result = await fetch(`https://api.apilayer.com/bank_data/iban_validate?iban_number=${iban}`, requestOptions)
        return await result.json();
    }

}

export const apiLayerBankDataAdapter = new ApiLayerBankDataAdapter();