import {
  Button,
  FormControl,
  FormLabel,
  InputLeftAddon,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast
} from '@chakra-ui/react';
import { axios } from '@/utils';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { KaprodiEditInput, ModalProps } from './interface';
import { MdTitle, MdSchool } from 'react-icons/md';
import { CustomInput } from '@/components/elements';
import { StudyProgram } from '@/components/modules/RegisterModule/interface';

export default function EditHeadOfStudyProgramModal({
  isOpen,
  onClose,
  refetchData,
  kaprodiId,
  kaprodiName,
  studyProgramName,
  studyProgramId,
}: ModalProps) {
  const toast = useToast();
  const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<KaprodiEditInput>();

  const fetchStudyPrograms = async () => {
    const result = await axios.get('/prodi');
    setStudyPrograms(result.data.data);
  };  

  useEffect(() => {
    fetchStudyPrograms();
    if (isOpen) {
      setValue('studyProgramId', studyProgramId);
      setValue('name', kaprodiName);
    }
  }, [setValue, studyProgramId, kaprodiName, isOpen]);

  const handleEditKaprodi = async (data: KaprodiEditInput) => {
    try {
      const dataToSend = { name: data.name, studyProgramId: data.studyProgramId }
      await axios.patch(`/kaprodi/${kaprodiId}`, dataToSend);

      setTimeout(() => {
        refetchData();
      }, 1000);

      toast({
        title: 'Berhasil',
        description: 'Berhasil mengubah kaprodi!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
    }
    catch(error) {
      toast({
        title: 'Gagal',
        description: 'Gagal mengubah kaprodi!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent borderRadius={48} p={8}>
        <ModalHeader
          textAlign={'center'}
          textColor={'blue.900'}
          fontSize={'3xl'}
        >
          Ubah Kepala Program Studi
        </ModalHeader>
        <ModalCloseButton p={6} borderRadius={32}/>
        <form onSubmit={handleSubmit(handleEditKaprodi)}>
          <ModalBody pb={6}>
            <CustomInput
              label='Nama'
              name='name'
              placeholder='Nama Kepala Program Studi'
              icon={MdTitle}
              error={errors.name?.message}
              register={{
                ...register('name', {
                  required: 'Nama kepala program studi tidak boleh kosong!'
                }),
              }}
            />
            <FormControl>
              <FormLabel>{"Program Studi"}</FormLabel>
              <InputGroup>
                <InputLeftAddon>
                  <MdSchool/>
                </InputLeftAddon>
                  <select 
                    aria-label='studyProgramId' 
                    id='studyProgramId' {...register("studyProgramId")}
                    >
                    {studyPrograms.map((prodi) => (
                      <option key={prodi.id} value={prodi.id}>
                        {prodi.name}
                      </option>
                    ))}
                  </select>
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent={'center'}>
            <Button onClick={onClose} mr={3}>
              Batal
            </Button>
            <Button
              bg="blue.500"
              _hover={{
                bg: 'blue.600',
              }}
              color="white"
              onClick={handleSubmit(handleEditKaprodi)}
            >
              Ubah
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}