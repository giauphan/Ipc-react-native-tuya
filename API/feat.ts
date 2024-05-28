
const QRCode = require('qrcode');

export function generateQrcode(ssid: string, password: string, token: string) {
    const dataString = JSON.stringify({
        s: ssid,
        p: password,
        t: token
    });
  
return dataString
}