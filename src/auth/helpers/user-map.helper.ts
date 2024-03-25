import { User } from '../shema/user.schema';

export const mapUserWithoutPsw = (user: User) => {
  return {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };
};
