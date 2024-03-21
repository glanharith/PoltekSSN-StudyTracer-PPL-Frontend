import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { GenericFormTextInputProps } from './interface';

export const GenericFormTextInput: React.FC<
  GenericFormTextInputProps & React.ComponentPropsWithoutRef<'input'>
> = ({ register, error, ...props }) => {
  return (
    <FormControl isInvalid={!!error}>
      <Input
        border={0}
        borderRadius={0}
        borderBottom="2px solid #e2e8f0"
        boxShadow="none !important"
        outline="none"
        py={2}
        _focusVisible={{
          outline: 'none',
          border: 0,
          borderBottom: '2px solid #3182ce',
        }}
        {...register}
        {...props}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
