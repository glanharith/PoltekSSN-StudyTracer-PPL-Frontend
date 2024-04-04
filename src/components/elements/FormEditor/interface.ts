export type QuestionOption = {
  id?: string;
  order?: number;
  label: string;
};

export type QuestionId = {
  id: string;
};

export type OptionId = {
  id: string;
};

export type FormQuestion = {
  id?: string;
  order?: number;
  type: 'TEXT' | 'CHECKBOX' | 'RADIO' | 'RANGE';
  question: string;
  rangeFrom?: number;
  rangeTo?: number;
  options?: QuestionOption[];
  newOptions?: QuestionOption[];
  updateOptions?: QuestionOption[];
  deleteOptions?: OptionId[];
};

export interface FormEditorInput {
  title: string;
  description: string;
  type: 'CURRICULUM' | 'CAREER';
  startTime: Date | string;
  endTime: Date | string;
  admissionYearFrom?: number;
  admissionYearTo?: number;
  graduateYearFrom?: number;
  graduateYearTo?: number;
  newQuestions: FormQuestion[];
  updateQuestions: FormQuestion[];
  deleteQuestions: QuestionId[];
}

export interface FormEditorProps {
  existingData?: FormEditorInput;
  id?: string | string[];
}
