import React from 'react';
import {
  Text,
  Flex,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import AllSurveys from '@/components/elements/AllSurveys';

const KaprodiSurveyModule = () => {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh' }}>
      
        <Flex justify="center" align="center" flex="1">
          <Text
            color={'blue.900'}
            fontSize={{ base: 28, md: 30 }}
            fontWeight="bold"
            m={4}
          >
            Daftar Survey
          </Text>
        </Flex>

      <AllSurveys role={'HEAD'}></AllSurveys>
    </div>
  );
};

export default KaprodiSurveyModule;
