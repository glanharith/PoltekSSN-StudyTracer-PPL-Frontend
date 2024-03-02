import { Flex, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ListSection, HeaderSection } from "./sections";
import { axios } from '@/utils';
import { Kaprodi } from "./interface";

export const KaprodiModule = () => {
  const toast = useToast();

  const [headOfStudyProgram, setHeadOfStudyProgram] = useState<Kaprodi[]>([])

  const fetchHeadofStudyProgram = async () => {
      try {
        const response = await axios.get('/kaprodi');
        setHeadOfStudyProgram(response.data);
      } catch (error) {
        toast({
          title: 'Gagal',
          description: 'Gagal memuat daftar kepala program studi',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
  useEffect(() => {
    fetchHeadofStudyProgram();
  }, []);

  const refetchData = () => {
    fetchHeadofStudyProgram();
  }

  return (
      <Flex className="min-h-screen" px={{ base: 4, md: 16 }} gap={4} flexDirection={'column'} justifyItems="center" padding={4}>
          <HeaderSection refetchData={refetchData}/>
          <ListSection kaprodi={headOfStudyProgram} />
      </Flex>
  )
}