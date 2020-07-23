export enum Territory {
  US = 'US'
}
export interface FunimationOptions {
  hostname: string;
  territory: Territory;
  token: string | undefined;
}
export interface FunimationUser {
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
}
export interface Show {
  id: number;
  title: string;
  thumbnail: ShowThumbnail;
}
export interface ShowThumbnail {
  url: string;
}
export interface Episode {
  id: number;
  title: string;
  subtitle: string;
}
export type ShowDetails = Show & {
  description: string;
  episodes: Episode[];
};

export interface LoginResponse {
  success: true;
  token: string;
  rlildup_cookie: string;
  user: FunimationUser;
  user_region: Territory;
}
export interface ErrorResponse {
  success: false;
  error: string;
}