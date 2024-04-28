export type Profile = {
  name?: string;
  alumni: {
    id: string;
    phoneNo?: string;
    npm: string;
    address?: string;
    enrollmentYear?: number;
    graduateYear?: number;
  };
};
