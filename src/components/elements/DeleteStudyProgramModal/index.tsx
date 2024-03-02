import {
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { ModalProps } from "./interface";

export default function DeleteStudyProgramModal({
  isOpen,
  onClose,
  dataToBeDeleted,
  refetchData,
}: ModalProps) {
  
  const handleDeleteSelected = async () => {
    try {
      
    } catch (error) {
      
    }
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        
      </ModalContent>
    </Modal>
  );
}
