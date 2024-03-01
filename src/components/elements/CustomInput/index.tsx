import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from '@chakra-ui/react';
import { FormInputProps } from './interface';

export const CustomInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  icon: IconComponent,
  register,
  error,
  selectOptions,
  leftAddon,
  defaultValue,
}) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
        {IconComponent && (
          <InputLeftAddon>
            <IconComponent />
          </InputLeftAddon>
        )}
        {!IconComponent && leftAddon && (
          <InputLeftAddon>{leftAddon}</InputLeftAddon>
        )}
        {type === 'select' ? (
          <Select placeholder={placeholder} {...register}>
            {selectOptions}
          </Select>
        ) : (
          <Input
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...register}
          />
        )}
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
