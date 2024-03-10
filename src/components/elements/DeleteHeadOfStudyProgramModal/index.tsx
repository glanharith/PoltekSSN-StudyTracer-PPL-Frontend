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

export default function DeleteHeadOfStudyProgramModal({
  isOpen,
  onClose,
  dataToBeDeleted,
  refetchData,
}: ModalProps){
  const toast = useToast();

  const handleDeleteKaprodi = async () => {
    try {
      const dataToSend = { ids: dataToBeDeleted };
      await axios({
        method: 'delete',
        url: '/kaprodi',
        data: dataToSend,
      });

      setTimeout(() => {
        refetchData();
      }, 1000);

      toast({
        title: 'Berhasil',
        description: 'Berhasil menghapus kaprodi!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } 
    catch(error) {
      toast({
        title: 'Gagal',
        description: 'Gagal menghapus kaprodi!',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Hapus Kepala Program Studi</ModalHeader>
        <ModalCloseButton p={6} borderRadius={32}/>
        <ModalBody>
          Apakah Anda yakin akan menghapus kaprodi yang dipilih?
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Batal</Button>
          <Button
            marginLeft={3}
            colorScheme='red'
            onClick={handleDeleteKaprodi}
          >
            Hapus
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
  