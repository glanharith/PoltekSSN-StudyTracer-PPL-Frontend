export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: 'CREATE' | 'EDIT';
  studyProgramId?: string;
  studyProgramName?: string;
  refetchData: () => void;
}

export interface StudyProgramInput {
  name: string;
}
