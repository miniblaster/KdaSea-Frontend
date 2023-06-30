import Axios from 'axios';
import FormData from 'form-data';

const url_file = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const url_json = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'
const API_KEY = '4faa835f88b04bfff75c';
const API_SECRET = '83ee05be67b55a1ff93c75dd81162ef872a97b6362c4f074e00489c2ab0484cd';

export async function uploadImageToPinata(data) {
    const formData = new FormData();
    formData.append('file', data);
    const result = await Axios.post(url_file, formData, {
        maxContentLength: 'Infinity',
        headers: {
            'Content-Type': `multipart/form-data;boundary=${formData._boundary}`,
            'pinata_api_key': API_KEY,
            'pinata_secret_api_key': API_SECRET
        }
    }).then(
        async function(response) {
            return response.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function uploadMetaDataToPinata(data) {
    const result = await Axios.post(url_json, data, {
        headers: {
            'pinata_api_key': API_KEY,
            'pinata_secret_api_key': API_SECRET
        }
    }).then(
        async function(response) {
            return response.data;
        }
    ).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}
