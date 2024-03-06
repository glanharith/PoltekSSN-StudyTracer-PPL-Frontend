import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { FormInputProps } from './interface';
import { useDebouncedCallback } from 'use-debounce';
import { zxcvbnAsync, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';
import * as zxcvbnIdPackage from '@zxcvbn-ts/language-id';
import { SecurityScoreBar } from './SecurityScoreBar';
import { matcherPwnedFactory } from '@zxcvbn-ts/matcher-pwned';

const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
zxcvbnOptions.addMatcher('pwned', matcherPwned);
zxcvbnOptions.setOptions({
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
    ...zxcvbnIdPackage.dictionary,
  },
});

export const CustomPasswordInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  icon: IconComponent,
  register,
  error,
  leftAddon,
  defaultValue,
  withValidation = false,
  password = '',
  scoreCallback = () => {},
}) => {
  const [type, setType] = useState('password');
  const [securityScore, setSecurityScore] = useState(0);

  const countScore = async (value: string) => {
    const { score } = await zxcvbnAsync(value);
    setSecurityScore(score);
    scoreCallback(score);
  };

  const debounced = useDebouncedCallback((value) => countScore(value), 1000);

  useEffect(() => {
    if (withValidation) debounced(password);
  }, [password]);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        {IconComponent && (
          <InputLeftAddon>
            <IconComponent />
          </InputLeftAddon>
        )}
        {!IconComponent && leftAddon && (
          <InputLeftAddon>{leftAddon}</InputLeftAddon>
        )}
        <Input
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register}
        />
        <InputRightAddon>
          {type === 'password' && (
            <IoMdEyeOff
              className="hover:cursor-pointer"
              onClick={() => setType('text')}
              data-testid="eye-off-icon"
            />
          )}
          {type === 'text' && (
            <IoMdEye
              className="hover:cursor-pointer"
              onClick={() => setType('password')}
              data-testid="eye-icon"
            />
          )}
        </InputRightAddon>
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
      {withValidation && <SecurityScoreBar score={securityScore} />}
    </FormControl>
  );
};
