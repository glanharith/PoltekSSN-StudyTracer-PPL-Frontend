export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: 'CREATE' | 'EDIT';
  studyProgramId?: string;
  studyProgramName?: string;
}

export interface StudyProgramInput {
  name: string;
}
