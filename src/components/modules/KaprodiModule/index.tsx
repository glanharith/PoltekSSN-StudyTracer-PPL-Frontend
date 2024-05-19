import { Flex, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ListSection, HeaderSection } from './sections';
import { axios } from '@/utils';
import { Kaprodi } from './interface';
import {KaprodiPagination } from '../KaprodiModule/interface';

export const KaprodiModule = () => {
  const toast = useToast();

  const [headOfStudyProgram, setHeadOfStudyProgram] = useState<Kaprodi[]>([]);
  const [selectedKaprodi, setSelectedKaprodi] = useState<string[]>([]);
  const [pagination, setPagination] = useState<KaprodiPagination>({
    page: 1,
  } as KaprodiPagination);
  const fetchHeadofStudyProgram = async () => {
    try {
      const response = await axios.get(`/kaprodi?page=${pagination.page}`);
      setHeadOfStudyProgram(response.data.data);
      setPagination(response.data.pagination)

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
  }, [pagination.page]);

  const refetchData = () => {
    fetchHeadofStudyProgram();
  };
  const prevPage = () => {
    if (pagination.page === 1) return;
    setPagination({ ...pagination, page: pagination.page - 1 });
  };
  const nextPage = () => {
    if (pagination.page === pagination.totalPage) return;
    setPagination({ ...pagination, page: pagination.page + 1 });
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
      <HeaderSection
        refetchData={refetchData}
        selectedKaprodi={selectedKaprodi}
      />
      <ListSection
        refetchData={refetchData}
        kaprodi={headOfStudyProgram}
        selectedKaprodi={selectedKaprodi}
        setSelectedKaprodi={setSelectedKaprodi}
        pagination= {pagination}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </Flex>
  );
};