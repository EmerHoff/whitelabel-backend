export interface IUserCreate {
  username: string;
  password: string;
  email: string;
  name: string;
  last_name: string;
  telephone: string;
  device_token?: string;
  type: string;
  status: string;
}
