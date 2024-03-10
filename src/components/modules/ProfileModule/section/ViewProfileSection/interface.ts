import { Profile } from '../../interface';

export type ViewProfileProps = {
  user: Profile;
};
export type ProfileInput = {
  name?: string;
  alumni: {
    phoneNo?: string;
    address?: string;
    enrollmentYear: string;
  };
};
