import { User } from '../shema/user.schema';

export const mapUserAuth = (user: User, token: string) => {
  return {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    token,
  };
};
