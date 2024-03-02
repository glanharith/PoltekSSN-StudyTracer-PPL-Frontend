import {
  Button,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  IconButton,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { MdPlaylistAdd } from 'react-icons/md';
import { ContentSectionProps } from './interface';
import StudyProgramModal from '@/components/elements/StudyProgramModal';
import DeleteStudyProgramModal from '../../../../elements/DeleteStudyProgramModal';
import { StudyProgram } from '../../interface';

export const ContentSection: React.FC<ContentSectionProps> = ({
  refetchData,
  studyProgram,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [method, setMethod] = useState<'CREATE' | 'EDIT'>('CREATE');
  const [studyProgramId, setStudyProgramId] = useState<string>('');
  const [studyProgramName, setStudyProgramName] = useState<string>('');

  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setMethod('CREATE');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (id: string, name: string) => {
    setMethod('EDIT');
    setStudyProgramId(id);
    setStudyProgramName(name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStudyProgramId('');
    setStudyProgramName('');
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedPrograms([]);
    setAllSelected(false);
    setIsDeleteModalOpen(false);
  };

  const handleCheckboxChange = (program: StudyProgram) => {
    setSelectedPrograms((currentSelectedPrograms) => {
      let updatedSelectedPrograms;
      if (currentSelectedPrograms.includes(program.id)) {
        // If found, remove from the selected programs
        updatedSelectedPrograms = currentSelectedPrograms.filter(
          (id) => id !== program.id
        );
      } else {
        // If not found, add to the selected programs
        updatedSelectedPrograms = [...currentSelectedPrograms, program.id];
      }
      // Check if all programs are selected
      const allSelected = updatedSelectedPrograms.length === studyProgram.length;
      setAllSelected(allSelected);
      return updatedSelectedPrograms;
    });
  };  

  const handleSelectAll = () => {
    setSelectedPrograms((currentSelectedPrograms) => {
      if (currentSelectedPrograms.length === studyProgram.length) {
        // If all items are selected, deselect all
        setAllSelected(false);
        return [];
      } else {
        // If not all items are selected, select all
        setAllSelected(true);
        return studyProgram.map((program) => program.id);
      }
    });
  };

  return (
    <Flex direction="column">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        margin={4}
      >
        <Flex justify="center" align="center" flex="1">
          <Text
            color={'blue.900'}
            fontSize={{ base: 28, md: 30 }}
            fontWeight="bold"
            ml={'40%'}
          >
            Daftar Program Studi
          </Text>
        </Flex>
        <Flex direction={{ base: 'column', md: 'row' }} className="buttons">
          <Button
            rightIcon={<BsTrash />}
            color={'white'}
            backgroundColor={'#B81515'}
            mr={2}
            size={'sm'}
            isDisabled={selectedPrograms.length === 0}
            onClick={handleOpenDeleteModal}
          >
            Hapus Prodi
          </Button>
          <Button
            rightIcon={<MdPlaylistAdd />}
            color={'white'}
            backgroundColor={'blue.500'}
            size={'sm'}
            onClick={handleOpenCreateModal}
          >
            Tambah Prodi
          </Button>
        </Flex>
      </Flex>
      <Flex justify="center" width="100%" margin={10}>
        <div
          className="study-program"
          style={{
            width: '50%',
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '20px',
          }}
        >
          <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>
                  <Checkbox
                    aria-label='checkbox'
                    isChecked={allSelected}
                    onChange={handleSelectAll}
                    mr={4}
                  />
                </Th>
                <Th>Nama</Th>
                <Th textAlign={'center'}>Edit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {studyProgram.length != 0 ? (
                studyProgram.map((data) => (
                  <Tr key={data.id}>
                    <Td>
                      <Checkbox
                        isChecked={selectedPrograms.includes(data.id)}
                        onChange={() => handleCheckboxChange(data)}
                      />
                    </Td>
                    <Td>{data.name}</Td>
                    <Td textAlign={'center'}>
                      <IconButton
                        size={'lg'}
                        color={'black'}
                        icon={<FiEdit />}
                        aria-label={'Edit Prodi'}
                        onClick={() => handleOpenEditModal(data.id, data.name)}
                      />
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={5} textAlign="center">
                    Tidak ada Program Studi
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </div>
      </Flex>

      <StudyProgramModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        method={method}
        studyProgramId={studyProgramId}
        studyProgramName={studyProgramName}
        refetchData={refetchData}
      />

      <DeleteStudyProgramModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        dataToBeDeleted={selectedPrograms}
        refetchData={refetchData}
      />
    </Flex>
  );
};
