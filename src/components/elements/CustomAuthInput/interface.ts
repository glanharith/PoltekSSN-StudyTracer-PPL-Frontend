import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { IconType } from 'react-icons';

export interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  icon?: IconType;
  leftAddon?: string;
  register: UseFormRegisterReturn;
  error?: string | undefined;
  selectOptions?: ReactNode;
}
