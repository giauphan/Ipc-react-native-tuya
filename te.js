const ora = require('ora');
const TuyaLink = require('@tuyapi/link').wizard;

// interface LinkOptions {
//     ssid: string;
//     password: string;
//     schema: string;
//     apiKey?: string;
//     apiSecret?: string;
//     saveAPI?: boolean;
//     region?: string;
//     timezone?: string;
//     email?: string;
//     passwordUser?: string;
//     bindAddr?: string;
//     num?: number;
//     save?: boolean;
// }


async function link(config, options) {
    // Check arguments
    if (!options.ssid || !options.password || !options.schema) {
        throw new Error('Missing required options.');
    }

    if ((!options.apiKey && !config.get('apiKey')) || (!options.apiSecret && !config.get('apiSecret'))) {
        throw new Error('API key and API secret are required.');
    }

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
        password: options.passwordUser,
        schema: options.schema,
        region: options.region,
        timezone: options.timezone,
        bindAddr: options.bindAddr
    });
    console.log(link)
    const spinner = ora('Registering devices(s)... ').start();

    try {
        await link.init();

        const devices = await link.linkDevice({ ssid: options.ssid, wifiPassword: options.password, devices: options.num });
        console.log(devices)
        spinner.succeed('Device(s) registered!');

        // Get device details
        const device_ids = devices.map((d) => d.device_id);
        const deviceDetails = (await link.getLinkedDevices({ ids: device_ids })).devices;

        // Save devices to config
        if (options.save) {
            for (const device of deviceDetails) {
                config.set(device.id, device.local_key);
            }
        }

        const prettyDevices = deviceDetails.map((d) => ({
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
    'apiKey': 'semd9njvunggem7srfv9',
    'apiSecret': 'afd6f5b93c6b4e8b98097022506f7c94'
}; // Your configuration object
const options = {
    ssid: 'TIN',
    apiKey: 'semd9njvunggem7srfv9',
    apiSecret: 'afd6f5b93c6b4e8b98097022506f7c94',
    password: '0965643046',
    schema: 'giauphancamerasmart',
    saveAPI: true,
    region: 'us',
    email: 'johndoe@example.com',
    passwordUser: 'examplepassword',
    timezone: "Asia/Ho_Chi_Minh",
    bindAddr: '192.168.1.19',
    num: 5,
    save: true
};

link(config, options)
    .then(() => {
        console.log('Linking process completed successfully.');
    })
    .catch((error) => {
        console.error('Error during linking process:', error);
    });