import { Survey } from '../SurveyCard/interface';

export interface AccordionProps {
  title: string;
  surveys: Survey[];
  admin: boolean;
}
