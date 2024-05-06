import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from '@chakra-ui/react';
import { axios } from '@/utils';
import { AlumniPagination } from './interface';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

export const AlumniListModule: React.FC = () => {
  const [alumniList, setAlumniList] = useState<any[]>([]);
  const [pagination, setPagination] = useState<AlumniPagination>({
    page: 1,
  } as AlumniPagination);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<any | null>(null);
  const handleAlumniClick = (alumni: any) => {
    setSelectedAlumni(alumni);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAlumni(null);
  };
  const fetchAlumnis = async () => {
    const result = await axios.get(`/alumni?page=${pagination.page}`);
    setAlumniList(result.data.data.users);
    setPagination(result.data.data.pagination);
  };
  useEffect(() => {
    fetchAlumnis();
  }, [pagination.page]);

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
      direction="column"
      minH={{ base: '100vh', md: '32em' }}
      alignItems="center"
      py={{ base: 10 }}
      gap={6}
    >
      <Text fontSize={{ base: 28, md: 40 }} fontWeight="semibold">
        Daftar Alumni
      </Text>

      <Flex
        direction="column"
        minH={{ base: '100vh', md: '32em' }}
        w="80%"
        gap={2}
      >
        <Table colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Nama</Th>
              <Th>Email</Th>
              <Th>Jurusan</Th>
            </Tr>
          </Thead>
          <Tbody>
            {alumniList.map((data) => (
              <Tr
                key={data.id}
                onClick={() => handleAlumniClick(data)}
                _hover={{ backgroundColor: 'blue.50', cursor: 'pointer' }}
              >
                <Td>{data.name}</Td>
                <Td>{data.email}</Td>
                <Td>{data.alumni.studyProgram.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Flex justifyContent={'space-between'} w={'full'} fontSize={12}>
          <span>
            Menampilkan {pagination.from} - {pagination.to} dari{' '}
            {pagination.totalAlumni}
          </span>
          <Flex alignItems={'center'} gap={1}>
            <GrFormPrevious
              data-testid="prev-page"
              className="cursor-pointer"
              onClick={prevPage}
            />
            <span>
              {pagination.page} / {pagination.totalPage}
            </span>
            <GrFormNext
              data-testid="next-page"
              className="cursor-pointer"
              onClick={nextPage}
            />
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedAlumni?.name} Detail</ModalHeader>
          <ModalBody>
            <Table maxWidth="100%">
              <Tbody>
                <Tr>
                  <Td>Email</Td>
                  <Td>{selectedAlumni?.email}</Td>
                </Tr>
                <Tr>
                  <Td>NPM</Td>
                  <Td>{selectedAlumni?.alumni?.npm}</Td>
                </Tr>
                <Tr>
                  <Td>Nomor HP</Td>
                  <Td>{selectedAlumni?.alumni?.phoneNo}</Td>
                </Tr>
                <Tr>
                  <Td>Alamat</Td>
                  <Td>{selectedAlumni?.alumni?.address}</Td>
                </Tr>
                <Tr>
                  <Td>Jenis Kelamin</Td>
                  <Td>
                    {selectedAlumni?.alumni?.gender === 'MALE'
                      ? 'Laki-laki'
                      : 'Perempuan'}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Tahun Masuk</Td>
                  <Td>{selectedAlumni?.alumni?.enrollmentYear}</Td>
                </Tr>
                <Tr>
                  <Td>Tahun Lulus</Td>
                  <Td>{selectedAlumni?.alumni?.graduateYear}</Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="blue" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
