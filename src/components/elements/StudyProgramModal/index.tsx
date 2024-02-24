import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import React from 'react';
import { ModalProps, StudyProgramInput } from './interface';

export default function CreateStudyProgramModal({
  isOpen,
  onClose,
  method,
  studyProgramId,
  studyProgramName,
}: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={48} p={8}></ModalContent>
    </Modal>
  );
}
