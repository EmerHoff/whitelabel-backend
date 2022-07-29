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

export interface IUserFindAll {
  username?: string;
  email?: string;
  complete_name?: string; // name + last_name
  telephone?: string;
  type?: string;
  status?: string;
}
