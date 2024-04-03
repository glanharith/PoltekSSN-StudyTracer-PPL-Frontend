import { useState, useEffect } from 'react';
import { axios } from '@/utils';
import { AllSurveysProps } from './interface';
import { Accordion, Text, useToast } from '@chakra-ui/react';
import SurveyAccordion from '../SurveyAccordion';
import { Survey } from '../SurveyCard/interface';
import {
  filterSurveys,
  isArchived,
  isOngoing,
  isUpcoming,
} from '@/utils/surveyUtils';

export default function AllSurveys({ role }: AllSurveysProps) {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const toast = useToast();

  useEffect(() => {
    fetchSurvey();
  }, []);

  const fetchSurvey = async () => {
    try {
      const response = await axios.get('/survey/all');
      setSurveys(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      toast({
        title: 'Gagal',
        description: 'Gagal memuat survey',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <div style={{ margin: 5 }}>
        <Text
          color={'blue.900'}
          fontSize={{ base: 20, md: 25 }}
          fontWeight="bold"
          margin={4}
        >
          SURVEY KURIKULUM
        </Text>
        <Accordion allowMultiple m={5}>
          <SurveyAccordion
            title={'Akan datang'}
            surveys={filterSurveys(surveys, 'CURRICULUM', isUpcoming)}
            isAdmin={role === 'ADMIN'}
          />
          <SurveyAccordion
            title={'Sedang berlangsung'}
            surveys={filterSurveys(surveys, 'CURRICULUM', isOngoing)}
            isAdmin={role === 'ADMIN'}
          />
          <SurveyAccordion
            title={'Sudah berakhir'}
            surveys={filterSurveys(surveys, 'CURRICULUM', isArchived)}
            isAdmin={role === 'ADMIN'}
          />
        </Accordion>
      </div>

      <div style={{ margin: 4 }}>
        <Text
          color={'blue.900'}
          fontSize={{ base: 20, md: 25 }}
          fontWeight="bold"
          margin={4}
        >
          SURVEY KARIR
        </Text>
        <Accordion allowMultiple m={5}>
          <SurveyAccordion
            title={'Akan datang'}
            surveys={filterSurveys(surveys, 'CAREER', isUpcoming)}
            isAdmin={role === 'ADMIN'}
          />
          <SurveyAccordion
            title={'Sedang berlangsung'}
            surveys={filterSurveys(surveys, 'CAREER', isOngoing)}
            isAdmin={role === 'ADMIN'}
          />
          <SurveyAccordion
            title={'Sudah berakhir'}
            surveys={filterSurveys(surveys, 'CAREER', isArchived)}
            isAdmin={role === 'ADMIN'}
          />
        </Accordion>
      </div>
    </div>
  );
}
