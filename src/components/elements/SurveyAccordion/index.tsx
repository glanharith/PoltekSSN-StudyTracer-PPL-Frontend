import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Grid,
  GridItem,
  Box,
  Text,
} from '@chakra-ui/react';
import { AccordionProps } from './interface';
import SurveyCard from '../SurveyCard';

export default function SurveyAccordion({
  title,
  surveys,
  isAdmin,
  refetchData,
}: AccordionProps) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton _expanded={{ bg: 'blue.900', color: 'white' }}>
          <Box as="span" flex="1" textAlign="left" fontWeight="bold">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={2} background={'gray.100'}>
        {surveys.length > 0 ? (
          <Grid templateColumns="repeat(3, 1fr)" gap={2} margin={5}>
            {surveys.map((survey) => (
              <GridItem key={survey.id}>
                <SurveyCard
                  survey={survey}
                  fillButton={false}
                  deleteButton={isAdmin}
                  editButton={isAdmin}
                  downloadButton={true}
                  previewButton={isAdmin}
                  isDisabled={false}
                  isUpcoming={false}
                  refetchData={refetchData}
                />
              </GridItem>
            ))}
          </Grid>
        ) : (
          <Text textAlign="center" color="gray.600" m={4}>
            Belum ada survey
          </Text>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
}
