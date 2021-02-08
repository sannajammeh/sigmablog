import { User } from './user.interface';

export class UserDTO implements User {
  readonly id?: string;
  readonly name: string;
  readonly username: string;
}
