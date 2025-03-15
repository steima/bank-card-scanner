import {apiKey} from "./apiKeyHelper";

class ApiLayerOcrAdapter {

    async getOcrResult(image: string): Promise<string> {
        const myHeaders = new Headers();
        myHeaders.append("apikey", apiKey("REACT_APP_API_LAYER_OCR_API_KEY"));
        const localResult = await fetch(image);
        const raw = await localResult.blob();
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        const result = await fetch("https://api.apilayer.com/image_to_text/upload", requestOptions);
        if(result.ok) {
            const obj = await result.json();
            const iban = this.findIban(obj.annotations);
            if(iban) {
                return iban;
            }
        }
        throw new Error("Error while getting ocr result");
    }

    findIban(annotations: string[]): string | undefined {
        const ibanRegex = /([A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16})/g;
        for (let annotation of annotations) {
            const iban = annotation.match(ibanRegex);
            if(iban) {
                return iban[0];
            }
        }
        return undefined;
    }

}

export const apiLayerOcrAdapter = new ApiLayerOcrAdapter();