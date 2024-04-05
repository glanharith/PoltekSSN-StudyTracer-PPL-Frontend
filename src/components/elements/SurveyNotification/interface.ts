export interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  export interface Survey {
    id: string;
    type: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    admissionYearFrom: number;
    admissionYearTo: number;
    graduateYearFrom: number;
    graduateYearTo: number;
  }
  
  