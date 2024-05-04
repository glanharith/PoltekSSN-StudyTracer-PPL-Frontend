export interface SurveyResponseProps {
  surveyId: string;
  role: 'ADMIN' | 'KAPRODI';
}

export interface SurveyResponse {
    id: string;
    type: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    admissionYearFrom?: number | null;
    admissionYearTo?: number | null;
    graduateYearFrom?: number | null;
    graduateYearTo?: number | null;
    questions: Question[];
    alumniResponse: AlumniResponse[];
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

  export interface Option {
    id: string;
    label: string;
    questionId: string;
    order: number;
  }
  
  export interface AlumniResponse {
    alumniId: string;
    npm: string;
    enrollmentYear: number;
    graduateYear: number;
    studyProgramId: string;
    name: string;
    studyProgramName: string;
    answers: Answer[];
  }
  
  export interface Answer {
    questionId: string;
    answer: string;
  }
  