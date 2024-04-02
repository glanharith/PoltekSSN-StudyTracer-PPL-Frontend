import { useState, useEffect } from 'react';
import { axios } from '@/utils';
import { AllSurveysProps } from './interface';
import { Accordion, Text, useToast } from '@chakra-ui/react';
import SurveyAccordion from '../SurveyAccordion';
import { Survey } from '../SurveyCard/interface';

export default function AllSurveys({ role }: AllSurveysProps) {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const toast = useToast();
  const today = new Date();

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

  const filterSurveys = (type: string, filterFn: any) => {
    if (!Array.isArray(surveys)) {
      return [];
    }
    return surveys.filter(
      (survey) =>
        survey.type === type &&
        filterFn(new Date(survey.startTime), new Date(survey.endTime))
    );
  };

  const isUpcoming = (startTime: Date) => {
    return startTime > today;
  };

  const isOngoing = (startTime: Date, endTime: Date) => {
    return startTime <= today && endTime > today;
  };

  const isArchived = (endTime: Date) => {
    return endTime <= today;
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
            surveys={filterSurveys('CURRICULUM', isUpcoming)}
            admin={role === 'ADMIN'}
          />
          <SurveyAccordion
            title={'Sedang berlangsung'}
            surveys={filterSurveys('CURRICULUM', isOngoing)}
            admin={role === 'ADMIN'}
          />
          <SurveyAccordion
            title={'Sudah berakhir'}
            surveys={filterSurveys('CURRICULUM', isArchived)}
            admin={role === 'ADMIN'}
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
            surveys={filterSurveys('CAREER', isUpcoming)}
            admin={role === 'ADMIN'}
          />
          <SurveyAccordion
            title={'Sedang berlangsung'}
            surveys={filterSurveys('CAREER', isOngoing)}
            admin={role === 'ADMIN'}
          />
          <SurveyAccordion
            title={'Sudah berakhir'}
            surveys={filterSurveys('CAREER', isArchived)}
            admin={role === 'ADMIN'}
          />
        </Accordion>
      </div>
    </div>
  );
}
