import { UseFormRegisterReturn } from 'react-hook-form';
import { IconType } from 'react-icons';

export interface FormInputProps {
  label?: string;
  placeholder?: string;
  icon?: IconType;
  leftAddon?: string;
  register: UseFormRegisterReturn;
  error?: string | undefined;
  defaultValue?: string;
  withValidation?: boolean;
  password?: string;
  scoreCallback?: (score: number) => void;
}
