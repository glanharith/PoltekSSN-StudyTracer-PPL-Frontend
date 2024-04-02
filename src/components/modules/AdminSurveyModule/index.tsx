import React from 'react';
import {
  Text,
  Flex,
  Button,
} from '@chakra-ui/react';
import { MdPlaylistAdd } from 'react-icons/md';
import { useRouter } from 'next/router';
import AllSurveys from '@/components/elements/AllSurveys';

const AdminSurveyModule = () => {
  const router = useRouter();

  const navigateToCreate = () => {
    router.push('/survey-management/create');
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        margin={6}
      >
        <Flex justify="center" align="center" flex="1">
          <Text
            color={'blue.900'}
            fontSize={{ base: 28, md: 30 }}
            fontWeight="bold"
            ml={'10%'}
          >
            Daftar Survey
          </Text>
        </Flex>
        <Button
          rightIcon={<MdPlaylistAdd />}
          color={'white'}
          backgroundColor={'blue.500'}
          size={'sm'}
          mt={2}
          onClick={navigateToCreate}
        >
          Tambah Survey
        </Button>
      </Flex>

      <AllSurveys role={'ADMIN'}></AllSurveys>
    </div>
  );
};

export default AdminSurveyModule;
