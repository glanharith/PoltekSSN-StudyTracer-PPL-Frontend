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
  VStack,
} from '@chakra-ui/react';
import { axios } from '@/utils';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ModalProps, StudyProgramInput } from './interface';
import { MdTitle } from 'react-icons/md';
import { CustomInput } from '@/components/elements';
import { BsMortarboard } from 'react-icons/bs';

export default function StudyProgramModal({
  isOpen,
  onClose,
  method,
  studyProgramId,
  studyProgramName,
  studyProgramCode,
  studyProgramLevel,
  refetchData,
}: ModalProps) {
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<StudyProgramInput>();

  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      clearErrors();
      if (method === 'EDIT') {
        setValue('name', studyProgramName!!);
        setValue('code', studyProgramCode!!);
        setValue('level', studyProgramLevel!!);
      } else {
        setValue('name', '');
        setValue('code', '');
        setValue('level', '');
      }
    }
  }, [
    isOpen,
    method,
    setValue,
    studyProgramName,
    studyProgramCode,
    studyProgramLevel,
  ]);

  const handleFormSubmit = async (data: StudyProgramInput) => {
    try {
      let successMessage: string;
      if (method === 'CREATE') {
        await axios.post('/prodi', { ...data });
        successMessage = 'Berhasil membuat program studi!';
      } else {
        await axios.patch(`/prodi/${studyProgramId}`, { ...data });
        console.log(data);
        successMessage = 'Berhasil mengubah program studi!';
      }
      toast({
        title: successMessage,
        status: 'success',
      });

      setTimeout(() => {
        refetchData();
      }, 1000);

      onClose();
    } catch (error: any) {
      const status = error.response?.status;
      let errorMessage;
      if (status === 409) {
        errorMessage = 'Nama program studi sudah digunakan!';
      } else {
        if (method === 'CREATE') {
          errorMessage = 'Gagal membuat program studi!';
        } else {
          errorMessage = 'Gagal mengubah program studi!';
        }
      }
      setError('name', { message: errorMessage });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={48} p={8}>
        <ModalHeader
          textAlign={'center'}
          textColor={'blue.900'}
          fontSize={'3xl'}
        >
          {method === 'CREATE' ? 'Tambah' : 'Ubah'} Program Studi
        </ModalHeader>
        <ModalCloseButton p={6} borderRadius={32} />
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <CustomInput
                label="Nama"
                name="name"
                placeholder="Nama Program Studi"
                error={errors.name?.message}
                icon={MdTitle}
                register={{
                  ...register('name', {
                    required: 'Nama program studi tidak boleh kosong!',
                  }),
                }}
                defaultValue={method === 'EDIT' ? studyProgramName : ''}
              />
              <CustomInput
                label="Kode"
                name="code"
                placeholder="Kode Program Studi"
                error={errors.code?.message}
                icon={MdTitle}
                register={{
                  ...register('code', {
                    pattern: {
                      value: /^([a-zA-Z0-9\-\_]+)?$/,
                      message: 'Kode program studi tidak valid',
                    },
                  }),
                }}
                defaultValue={method === 'EDIT' ? studyProgramCode : ''}
              />
              <CustomInput
                label="Jenjang Pendidikan"
                name="level"
                defaultValue={method === 'EDIT' ? studyProgramLevel : 'D3'}
                type="select"
                selectOptions={
                  <>
                    <option value="D3">D3</option>
                    <option value="D4">D4</option>
                  </>
                }
                error={errors.level?.message}
                icon={BsMortarboard}
                register={{
                  ...register('level', {
                    required: 'Pilih jenjang pendidikan program studi',
                  }),
                }}
              />
            </VStack>
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
              isLoading={isSubmitting}
              type="submit"
            >
              {method === 'CREATE' ? 'Buat' : 'Ubah'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
