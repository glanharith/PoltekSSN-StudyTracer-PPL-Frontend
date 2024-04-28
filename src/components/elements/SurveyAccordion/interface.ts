import { Survey } from '../SurveyCard/interface';

export interface AccordionProps {
  title: string;
  surveys: Survey[];
  isAdmin: boolean;
  refetchData: () => void;
}
