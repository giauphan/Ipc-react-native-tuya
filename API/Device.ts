const ora = require('ora');
const TuyaLink = require('@tuyapi/link').wizard;

interface LinkOptions {
    ssid: string;
    password: string;
    schema: string;
    apiKey?: string;
    apiSecret?: string;
    saveAPI?: boolean;
    region?: string;
    timezone?: string;
    email?: string;
    passwordUser?: string;
    bindAddr?: string;
    num?: number;
    save?: boolean;
}

export async function link(options:LinkOptions, config:any) {
    // Check arguments
    if (!options.ssid || !options.password || !options.schema) {
        throw new Error('Missing required options.');
    }

    if ((!options.apiKey && !config.get('apiKey')) || (!options.apiSecret && !config.get('apiSecret'))) {
        throw new Error('API key and API secret are required.');
    }

    // // Save API parameters
    // if (options.saveAPI) {
    //     config.set('apiKey', options.apiKey);
    //     config.set('apiSecret', options.apiSecret);
    // }

    // Set API parameters
    if (!options.apiKey) {
        options.apiKey = config.get('apiKey');
    }

    if (!options.apiSecret) {
        options.apiSecret = config.get('apiSecret');
    }

    // Start linking process
    const link = new TuyaLink({
        apiKey: options.apiKey,
        apiSecret: options.apiSecret,
        email: options.email,
        password: options.password,
        schema: options.schema,
        region: options.region,
        timezone: options.timezone,
        bindAddr: options.bindAddr
    });

    const spinner = ora('Registering devices(s)... ').start();

    try {
        await link.init();

        const devices = await link.linkDevice({ ssid: options.ssid, wifiPassword: options.password, devices: options.num });
        console.log(devices)
        spinner.succeed('Device(s) registered!');

        // Get device details
        const device_ids = devices.map((d:any) => d.device_id);
        const deviceDetails = (await link.getLinkedDevices({ ids: device_ids })).devices;

        // Save devices to config
        if (options.save) {
            for (const device of deviceDetails) {
                config.set(device.id, device.local_key);
            }
        }

        const prettyDevices = deviceDetails.map((d:any) => ({
            id: d.id,
            ip: d.ip,
            localKey: d.local_key,
            name: d.name
        }));

        return console.log(prettyDevices);
    } catch (error) {
        spinner.fail('Device(s) failed to be registered!');
        console.log(error);
    }
}


const config = {
    'apiKey': 'apiKey',
    'apiSecret': 'apiSecret'
}; // Your configuration object
const options = {
    ssid: 'TIN',
    apiKey: 'apiKey',
    apiSecret: 'apiSecret',
    password: '0965643046',
    schema: 'giauphancamerasmart',
    saveAPI: true,
    region: 'us',
    timezone: 'UTC',
    bindAddr: '192.168.1.26',
    num: 5,
    save: true
};