export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: 'CREATE' | 'EDIT';
  studyProgramId?: string;
  studyProgramName?: string;
  studyProgramCode?: string;
  studyProgramLevel?: string;
  refetchData: () => void;
}

export interface StudyProgramInput {
  name: string;
  level: string;
  code: string;
}
