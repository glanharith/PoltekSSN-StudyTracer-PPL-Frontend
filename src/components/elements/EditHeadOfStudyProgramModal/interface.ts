export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchData: () => void;
  kaprodiId: string;
  kaprodiName: string;
  studyProgramId: string;
  studyProgramName: string;
}

export interface KaprodiEditInput {
  name?: string;
  studyProgramId?: string;
}