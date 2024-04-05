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

export default function DeleteSurveyModal({
  isOpen,
  onClose,
  dataToBeDeleted,
  refetchData
}: ModalProps){
  const toast = useToast();

  const handleDeleteSurvey = async () => {
    try {
      await axios({
        method: 'delete',
        url: `/survey/${dataToBeDeleted}`
      });

      setTimeout(() => {
        refetchData();
      }, 1000);

      toast({
        title: 'Berhasil',
        description: 'Berhasil menghapus survey!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
    }
    catch(error) {
      console.log(error)
      toast({
        title: 'Gagal',
        description: 'Gagal menghapus survey!',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  return(
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Hapus Survey</ModalHeader>
        <ModalCloseButton p={6} borderRadius={32}/>
        <ModalBody>
          Apakah Anda yakin akan menghapus survey yang dipilih?
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Batal</Button>
          <Button
            marginLeft={3}
            colorScheme='red'
            onClick={handleDeleteSurvey}
          >Hapus
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}