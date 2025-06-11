import { UserRole } from '../model/user-role';

export type UserDto = {
  id: number;
  profilePicturePath: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  bio: string;
  role: UserRole;
};
