export type QuestionOption = {
  label: string;
};

export type FormQuestion = {
  type: 'TEXT' | 'CHECKBOX' | 'RADIO' | 'RANGE';
  question: string;
  rangeFrom?: number;
  rangeTo?: number;
  options?: QuestionOption[];
};

export interface FormBuilderInput {
  title: string;
  description: string;
  type: 'CURRICULUM' | 'CAREER';
  startTime: Date;
  endTime: Date;
  admissionYearFrom?: number;
  admissionYearTo?: number;
  graduateYearFrom?: number;
  graduateYearTo?: number;
  questions: FormQuestion[];
}
