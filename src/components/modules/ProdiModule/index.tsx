import { Flex, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ContentSection } from './sections';
import { axios } from '@/utils';
import { StudyProgram } from './interface';

export const ProdiModule = () => {
  const toast = useToast();

  const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([]);

  const fetchStudyPrograms = async () => {
    try {
      const response = await axios.get('/prodi');
      setStudyPrograms(response.data.data);
<<<<<<< HEAD
      console.log(response);
=======
>>>>>>> 487d1a89b79a3709f6f5713ac148e333e3c7fc0e
    } catch (error) {
      toast({
        title: 'Gagal',
        description: 'Gagal memuat daftar program studi!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchStudyPrograms();
  }, []);

  const refetchData = () => {
    fetchStudyPrograms();
  };

  return (
    <Flex
      className="min-h-screen"
      px={{ base: 4, md: 16 }}
      gap={4}
      flexDirection={'column'}
      justifyItems="center"
      padding={4}
    >
      <ContentSection refetchData={refetchData} studyProgram={studyPrograms} />
    </Flex>
  );
};
