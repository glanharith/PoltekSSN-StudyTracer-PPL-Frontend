import { InputProps } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface GenericFormTextInputProps extends InputProps {
  register?: UseFormRegisterReturn;
  error?: string | undefined;
}
