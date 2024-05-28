// import TuyaCloud from '@tuya/cloud'

// const config = {
//     host: 'https://openapi.tuyaus.com',
//     accessKey: 'accessKey',
//     secretKey: 'secretKey',
// };

// const api = new Cloud({
//     key: config.accessKey, secret: config.secretKey
// });


// export async function Login(email: string, password: string) {

//     const user = api.loginEx({ email: email, password: password }).then(async sid => {
//         console.log(sid);

//         api.request({ action: 'tuya.m.location.list' }).then(async groups => {
//             for (const group of groups) {
//                 api.request({ action: 'tuya.m.my.group.device.list', gid: group.groupId }).then(async devicesArr => {
//                     for (const device of devicesArr) {
//                         console.log('group: "%s"\tdevice: "%s"\tdevId: "%s"', group.name, device.name, device.devId);
//                     }
//                 });
//             }
//         });
//     });

//     return user

// }

// export async function Register(email: string, password: string) {
//     const register = api.register({
//         email: email,
//         password: password
//     })
//         .then(sid => console.log('Session ID: ', sid))

//     return register
// }
// const date = '2024-04-17'; 
// const url= getVideoPlayBack('vdevo171353801894919', '2024-04-20')
//    .then((result: string[]) => {
//      console.log('Playback data retrieved successfully:', result);
//    })
//    .catch((error: any) => {
//      console.error('Failed to retrieve playback data:', error);
//    });

