import { Question } from '@/components/modules/FillSurveyModule/interface';

export interface SurveyResponseProps {
  surveyId: string,
}

export interface OptionStat {
  optionLabel: string;
  optionAnswersCount: number;
  percentage: string;
}

export interface QuestionStat {
  question: string;
  questionType: 'TEXT' | 'RADIO' | 'CHECKBOX' | 'RANGE';
  data: string[] | OptionStat[];
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
  totalRespondents: number;
  answerStats: QuestionStat[];
  message: string;
}