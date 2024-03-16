export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchData: () => void;
  dataToBeDeleted: string[];
}