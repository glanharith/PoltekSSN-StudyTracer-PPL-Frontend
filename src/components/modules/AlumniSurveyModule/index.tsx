import React, { useState, useEffect } from 'react';
import { axios } from '@/utils';
import { Profile } from '@/components/modules/ProfileModule/interface';
import { Text, useToast, Grid, GridItem } from '@chakra-ui/react';
import SurveyCard from '@/components/elements/SurveyCard';
import { Survey } from '@/components/elements/SurveyCard/interface';
import { AlumniSurveyModuleProps } from './interface';

const AlumniSurveyModule: React.FC<AlumniSurveyModuleProps> = ({
  surveyType,
}) => {
  const [user, setUser] = useState<Profile>();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const toast = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user) {
      fetchSurvey();
    }
  }, [user, surveyType]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/profile');
      setUser(response.data.data);
    } catch (error) {
      toast({
        title: 'Gagal',
        description: 'Gagal memuat tahun pengguna',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchSurvey = async () => {
    try {
      const response = await axios.get(
        `/survey?admissionYear=${user?.alumni.enrollmentYear}&graduateYear=${user?.alumni.graduateYear}`,
      );
      setSurveys(response.data.data);
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
    <div style={{ minHeight: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <Text
          color={'blue.900'}
          fontSize={{ base: 28, md: 30 }}
          fontWeight="bold"
          mt={4}
        >
          {surveyType === 'CAREER' ? 'Survey Karir' : 'Survey Kurikulum'}
        </Text>
      </div>
      <Grid templateColumns="repeat(3, 1fr)" gap={2} margin={5}>
        {surveys.length > 0 ? (
          surveys.map(
            (survey) =>
              survey.type === surveyType && (
                <GridItem key={survey.id}>
                  <SurveyCard
                    survey={survey}
                    fillButton={true}
                    deleteButton={false}
                    editButton={false}
                    downloadButton={false}
                    previewButton={false}
                    refetchData={() => {}}
                    isDisabled={survey.responses?.some(
                      (response) => response.alumniId === user?.alumni.id,
                    )}
                  />
                </GridItem>
              ),
          )
        ) : (
          <Text textAlign="center" fontSize="lg" color="gray.500" mt={5}>
            Belum ada survey
          </Text>
        )}
      </Grid>
    </div>
  );
};

export default AlumniSurveyModule;
