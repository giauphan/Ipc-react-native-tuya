
export interface HumanDetectionEvent {
    time: string;
    thumbnail: string;
}

export interface User {
    nick_name: string,
    token: string,
    role_type: string[],
    role_name: string[],
    user_id: string;
    access_id: string;
    user_name: string;
    micro_token: string;
    tenant_code: string;
}
export type RootStackParamList = {
    Home: undefined;
    add_network:undefined;
    auth: undefined;
    register:undefined
    guest: undefined;
    watch: undefined;
    profile: undefined;
    login: undefined;
    QRCode: { ssid: string; password: string };
  
  };
  
export interface UserResource{
    result:User
}