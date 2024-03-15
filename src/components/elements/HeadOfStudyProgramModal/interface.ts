export interface KaprodiModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: 'CREATE' | 'EDIT';
  studyProgramId?: string;
  refetchData: () => void;
}

export interface CreateHeadOfStudyProgramInput {
  studyProgramId: string;
  email: string;
  name: string;
  password: string;
  nip: string;
}
