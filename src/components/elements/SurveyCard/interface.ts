import { StudyProgram } from '@/components/modules/RegisterModule/interface';

interface CardProps {
  survey: Survey;
  fillButton?: boolean;
  deleteButton?: boolean;
  editButton?: boolean;
  downloadButton?: boolean;
  previewButton?: boolean;
  isDisabled?: boolean;
  isUpcoming?: boolean;
  surveyCount?: number;
  refetchData: () => void;
}

interface Alumni {
  id: string;
  responses: Response[];
}

interface Survey {
  id: string;
  type: FormType;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  admissionYearFrom?: number | null;
  admissionYearTo?: number | null;
  graduateYearFrom?: number | null;
  graduateYearTo?: number | null;
  responses?: Response[];
  _count: {
    responses: number
  }
}

interface Response {
  id: string;
  formId: string;
  alumniId: string;
  form?: Survey;
  alumni: Alumni;
}

enum FormType {
  CURRICULUM = 'CURRICULUM',
  CAREER = 'CAREER',
}

export { FormType };
export type {
  CardProps,
  Alumni,
  StudyProgram,
  Response,
  Survey,
};

