import CryptoJS from 'crypto-js';
import axios from 'axios';

const config = {
    host: 'https://openapi.tuyaus.com',
    accessKey: 'accessKey',
    secretKey: 'secretKey',
    deviceId: 'deviceId',
};

let token = '';

async function main(lang = null) {
    await getToken(lang);

    console.log('fetch success:', token);
    const url = await getVideoUrl(lang);
    console.log('fetch get video:', url);

}

async function getToken(lang = null) {
    const method = 'GET';
    const timestamp = Date.now();
    const nonce = '';
    const signUrl = '/v1.0/token?grant_type=1';
    const contentSHA256 = CryptoJS.SHA256('').toString();
    const accessToken = token;


    const stringToSign = `${method}\n${contentSHA256}\n\n${signUrl}`;

    const signature = calcSign(config.accessKey, accessToken, timestamp, nonce, stringToSign, config.secretKey);
    const headers = {
        t: timestamp,
        sign_method: 'HMAC-SHA256',
        client_id: config.accessKey,
        sign: signature,
        ...(lang !== null && { lang }),
    };

    const response = await fetchUrl(config.host + signUrl, method, headers);

    if (!response || !response.data.success) {
        throw new Error(`fetch failed: ${response.data.msg}`);
    }

    token = response.data.result.access_token;
}

async function fetchUrl(url :string, method :string, headers:object, data = null) {
    try {
        const options = {
            method: method,
            headers: {
                ...headers,
                'Content-type': 'application/x-www-form-urlencoded',
            },
            data: data,
        };

        return await axios(url, options);
    } catch (error) {
        throw new Error(`Failed to fetch URL: ${error}`);
    }
}

function calcSign(clientId, accessToken, timestamp, nonce, signStr, secret) {
    const str = `${clientId}${accessToken}${timestamp}${nonce}${signStr}`;
    const hash = CryptoJS.HmacSHA256(str, secret);
    return hash.toString(CryptoJS.enc.Hex).toUpperCase();
}

export async function getVideoUrl(lang = null) {
    const method = 'POST';
    const timestamp = Date.now();
    const nonce = '';
    const signUrl = `/v1.0/devices/${config.deviceId}/stream/actions/allocate`;
    const body = {
        type: 'HLS',
    };
    const contentHash = CryptoJS.SHA256(JSON.stringify(body)).toString();
    const    stringToSign = [method, contentHash, '', decodeURIComponent(signUrl)].join('\n');
    const accessToken = token;

    const signature = calcSign(config.accessKey, accessToken, timestamp, nonce, stringToSign, config.secretKey);
    const headers = {
        t: timestamp,
        sign_method: 'HMAC-SHA256',
        client_id: config.accessKey,
        sign: signature,
        access_token: token,
        ...(lang !== null && { lang }),
    };



    const response = await fetchUrl(config.host + signUrl, method, headers, body);

    if (!response || !response.data.success) {
        throw new Error(`Failed to get video URL: ${response ? response.data.msg : 'Unknown error'}`);
    }

    return response.data.result.url;
}

main('en')
