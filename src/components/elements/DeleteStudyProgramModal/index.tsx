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
import React from 'react';
import { ModalProps } from './interface';

export default function DeleteStudyProgramModal({
  isOpen,
  onClose,
  dataToBeDeleted,
  refetchData,
}: ModalProps) {
  const toast = useToast();

  const handleDeleteSelected = async () => {
    try {
      const dataToSend = { ids: dataToBeDeleted };
      await axios({
        method: 'delete',
        url: '/prodi',
        data: dataToSend,
      });

      setTimeout(() => {
        refetchData();
      }, 1000);

      toast({
        title: 'Berhasil',
        description: 'Berhasil menghapus program!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
<<<<<<< HEAD
    } catch (error) {
      toast({
        title: 'Gagal',
        description: 'Gagal menghapus program studi!',
=======
    } catch (error: any) {
      const status = error.response?.status;
      let errorDescription = '';

      if (status === 409) {
        errorDescription = error.response.data.message + '!';
      } else if (status === 404) {
        errorDescription = 'Program studi tidak ditemukan!';
      } else {
        errorDescription = 'Gagal menghapus program studi!';
      }

      toast({
        title: 'Gagal',
        description: errorDescription,
>>>>>>> 487d1a89b79a3709f6f5713ac148e333e3c7fc0e
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Hapus Program Studi</ModalHeader>
        <ModalCloseButton p={6} borderRadius={32} />
        <ModalBody>
          Apakah Anda yakin akan menghapus program yang dipilih?
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Batal</Button>
          <Button
            marginLeft={3}
            colorScheme="red"
            onClick={handleDeleteSelected}
          >
            Hapus
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
