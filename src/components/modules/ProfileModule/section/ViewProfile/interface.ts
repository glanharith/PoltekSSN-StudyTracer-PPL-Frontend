import { Profile } from '../../interface';

export type ViewProfileProps = {
  user: Profile;
};
export type ProfileInput = {
  name?: string;
  password?: string;
  confirmPassword?: string;
  alumni: {
    phoneNo?: string;
    address?: string;
    enrollmentYear: string;
  };
};
