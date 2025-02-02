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
} from '@chakra-ui/react';
import { axios } from '@/utils';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ModalProps, StudyProgramInput } from './interface';
import { MdTitle } from 'react-icons/md';
import { CustomInput } from '@/components/elements';

export default function StudyProgramModal({
  isOpen,
  onClose,
  method,
  studyProgramId,
  studyProgramName,
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
      } else {
        setValue('name', '');
      }
    }
  }, [isOpen, method, setValue, studyProgramName]);

  const handleFormSubmit = async (data: StudyProgramInput) => {
    try {
      let successMessage: string;
      if (method === 'CREATE') {
        await axios.post('/prodi', {
          name: data.name,
        });
        successMessage = 'Berhasil membuat program studi!';
      } else {
        await axios.patch(`/prodi/${studyProgramId}`, {
          name: data.name,
        });
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
            <CustomInput
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
