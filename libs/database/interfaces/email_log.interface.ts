import { User } from '../models/user.model';

export interface IEmailLogCreate {
  user_id: User;
  content: string;
  type: string;
}
