import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import { AccordionProps } from './interface';
export default function SurveyAccordion({
  title,
  surveys,
  admin,
}: AccordionProps) {
  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel></AccordionPanel>
    </AccordionItem>
  );
}
