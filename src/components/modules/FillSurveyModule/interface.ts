export interface Option {
    id: string;
    label: string;
    questionId: string;
    order: number;
  }
  
export interface Question {
    id: string;
    type: 'TEXT' | 'CHECKBOX' | 'RADIO' | 'RANGE';
    question: string;
    rangeFrom?: number;
    rangeTo?: number;
    options?: Option[];
    order: number;
    formId: string;
}

export interface Survey {
    id: string;
    title: string;
    type: string;
    description: string;
    startTime?: string;
    endTime?: string;
    admissionYearFrom?: number;
    admissionYearTo?: number;
    graduateYearFrom?: number;
    graduateYearTo?: number;
    questions: Question[];
  }


export interface SurveyFormProps {
  surveyId: string;
}