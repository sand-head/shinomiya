export enum Territory {
  US = 'US'
}
export interface FunimationOptions {
  hostname: string;
  territory: Territory;
  token: string | undefined;
}
export interface FuniLoginResponse {
  token: string;
  rlildup_cookie: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    last_login_local: string; // actually a DateTime
    displayName: string;
    avatar: string;
    defaultLanguage: string;
    last_login: string;
    date_joined: string;
  };
  user_region: Territory;
}