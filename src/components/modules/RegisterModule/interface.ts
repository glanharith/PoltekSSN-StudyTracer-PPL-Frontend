export type RegisterInput = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  enrollmentYear: number;
  graduateYear: number;
  gender: string;
  address: string;
  phoneNo: string;
  studyProgramId: string;
};

export type StudyProgram = {
  id: string;
  name: string;
};
