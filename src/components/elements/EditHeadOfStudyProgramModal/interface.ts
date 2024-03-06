export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchData: () => void;
  kaprodiId: string;
  kaprodiName: string;
  studyProgramName: string;
  studyProgramId: string;
};

export interface KaprodiEditInput {
  name: string;
  studyProgramId: string;
};