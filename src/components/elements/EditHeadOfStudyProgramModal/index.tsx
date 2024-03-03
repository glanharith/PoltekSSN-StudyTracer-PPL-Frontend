import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import { axios } from '@/utils';
import { useForm } from 'react-hook-form';
import { StudyProgram } from '@/components/modules/RegisterModule/interface';
import { MdTitle, MdSchool } from 'react-icons/md';
import { ModalProps, KaprodiEditInput } from './interface';

export default function EditHeadOfStudyProgramModal({
  isOpen,
  onClose,
  kaprodiId,
  kaprodiName,
  studyProgramId,
  refetchData,
}: ModalProps) {
  const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([]);
  const toast = useToast();
  const { handleSubmit, register, setValue, formState: { errors, isSubmitting } } = useForm<KaprodiEditInput>();

  useEffect(() => {
    const fetchStudyPrograms = async () => {
      try {
        const result = await axios.get('/prodi');
        setStudyPrograms(result.data.data);
        setValue('name', kaprodiName || '');
        setValue('studyProgramId', studyProgramId || '');
      } catch (error) {
        toast({
          title: 'Error loading study programs',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    if (isOpen) {
      fetchStudyPrograms();
    }
  }, [isOpen, kaprodiName, studyProgramId, setValue, toast]);

  const handleEditKaprodi = async (data: KaprodiEditInput) => {
    try {
      await axios.patch(`/kaprodi/${kaprodiId}`, {
        name: data.name,
        studyProgramId: data.studyProgramId,
      });
      toast({
        title: 'Success',
        description: 'Kaprodi successfully updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      refetchData();
      onClose();
    } catch (error) {
      toast({
        title: 'Error updating kaprodi',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={48} p={8}>
        <ModalHeader textAlign={'center'} textColor={'blue.900'} fontSize={'3xl'}>
          Ubah Kepala Program Studi
        </ModalHeader>
        <ModalCloseButton p={6} borderRadius={32} />
        <form onSubmit={handleSubmit(handleEditKaprodi)}>
          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors.name?.message}>
              <FormLabel htmlFor='name'>Nama Kaprodi</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<MdTitle />} />
                <input id='name' placeholder='Nama Kaprodi' {...register('name', { required: 'Nama kaprodi tidak boleh kosong!' })} />
              </InputGroup>
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.studyProgramId?.message}>
              <FormLabel htmlFor='studyProgramId'>Jurusan</FormLabel>
              <Select id="studyProgramId" placeholder='Select study program' {...register('studyProgramId', { required: 'Jurusan tidak boleh kosong!' })}>
                {studyPrograms.map((prodi) => (
                  <option key={prodi.id} value={prodi.id}>
                    {prodi.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.studyProgramId?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent={'center'}>
            <Button onClick={onClose} mr={3}>
              Batal
            </Button>
            <Button
              bg="blue.500"
              _hover={{ bg: 'blue.600' }}
              color="white"
              isLoading={isSubmitting}
              type="submit"
            >
              Ubah
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
