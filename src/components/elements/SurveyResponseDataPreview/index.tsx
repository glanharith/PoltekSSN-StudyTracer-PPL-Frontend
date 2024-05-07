import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Stack,
  Flex,
  useToast,
  Text,
} from '@chakra-ui/react';
import VisualizationText from './VisualizationText';
import VisualizationCheckbox from './VisualizationCheckbox';
import VisualizationRadio from './VisualizationRadio';
import VisualizationRange from './VisualizationRange';
import { SurveyResponseProps, Survey } from './interface';
import { axios } from '@/utils';
import { useRouter } from 'next/router';

const SurveyResponseDataPreview: React.FC<SurveyResponseProps> = (
    { surveyId }
  ) => {
  const [surveyData, setSurveyData] = useState<Survey | undefined>()

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (surveyId) {
      const fetchSurveyData = async ()  => {
        try {
          const response = await axios.get(`survey/${surveyId}/response-preview/questions`);
          setSurveyData(response.data)
        } catch (error: any) {
          toast({
            title: 'Gagal',
            description: 'Gagal memuat data survey',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          router.replace('/');
        }
      };

      fetchSurveyData()
    }
  }, [surveyId, toast]);

  return (
    <Box>
      {surveyData && (
        <>
          {surveyData.message != 'Respon Survei' && (
            <Text
              color={'blue.900'}
              fontSize={{ base: 28, md: 30 }}
              fontWeight="bold"
              ml={"40%"}
              paddingTop={5}
              paddingBottom={5}
            >
              {surveyData.message}
            </Text>
          )}
          <Flex justify={'center'}>
            <Box p={4} w={{ base: '90%', lg: '50%' }}>
              <Flex flexDirection={'column'} gap={'16px'}>
                <Box rounded={'md'} bgColor={'white'} padding={'20px'}>
                  <Heading textColor={'black'} mb={4}>
                    {' '}
                    {surveyData.title}
                  </Heading>
                  <Box textColor={'black'} mb={4}>
                    {surveyData.description}
                  </Box>
                  <Box textColor={'black'} mb={4}>
                    {surveyData.totalRespondents} jawaban
                  </Box>
                </Box>
                <Box rounded={'md'} bgColor={'white'} padding={'16px'}>
                  <Stack spacing={8}>
                    {surveyData.answerStats.map((question, index) => (
                      <React.Fragment key={index}>
                        <Text  mb={0} >
                          {question.question}
                        </Text>
                        <Text fontSize="11px" opacity="0.9" mt={-19}>
                          {surveyData.totalRespondents} jawaban
                        </Text>
                        {(() => {
                          switch (question.questionType) {
                            case 'TEXT':
                              return <VisualizationText question={question}/>;
                            case 'CHECKBOX':
                              return <VisualizationCheckbox question={question}/>;
                            case 'RADIO':
                              return <VisualizationRadio question={question}/>;
                            case 'RANGE':
                              return <VisualizationRange question={question}/>;
                            default:
                              return null;
                          }
                        })()}
                      </React.Fragment>
                    ))}
                  </Stack>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default SurveyResponseDataPreview;