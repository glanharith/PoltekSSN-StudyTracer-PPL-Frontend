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
    } catch (error) {
      toast({
        title: 'Gagal',
        description: 'Gagal menghapus program studi',
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
