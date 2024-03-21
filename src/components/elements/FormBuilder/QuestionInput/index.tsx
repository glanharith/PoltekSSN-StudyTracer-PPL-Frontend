import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Icon,
  Radio,
} from '@chakra-ui/react';
import { GenericFormTextInput } from '../GenericFormTextInput';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { CustomInput } from '../..';
import { BsTrash } from 'react-icons/bs';
import React, { useEffect } from 'react';
import { QuestionInputProps } from './interface';
import { FiPlusCircle, FiX } from 'react-icons/fi';

export const QuestionInput: React.FC<QuestionInputProps> = ({
  remove,
  index,
}) => {
  const { register, watch, control, getFieldState, setValue } =
    useFormContext();
  const type = watch(`questions.${index}.type`);
  const rangeFrom = watch(`questions.${index}.rangeFrom`);
  const rangeTo = watch(`questions.${index}.rangeTo`);
  const {
    fields,
    append,
    remove: removeOption,
  } = useFieldArray({
    name: `questions.${index}.options`,
    control,
  });

  useEffect(() => {
    if (type === 'TEXT') removeOption();
    if ((type === 'CHECKBOX' || type === 'RADIO') && fields.length < 1)
      append({ label: '' });
    if (type === 'RANGE') {
      setValue(`questions.${index}.rangeFrom`, 1);
      setValue(`questions.${index}.rangeTo`, 3);
    }
  }, [type]);

  return (
    <FormControl>
      <Flex
        gap={{ base: 2, md: 6 }}
        direction={{
          base: 'column',
          md: 'row',
        }}
      >
        <Flex direction="column" gap={4} w="full">
          <Flex direction={{ base: 'column', lg: 'row' }} gap={4}>
            <GenericFormTextInput
              placeholder="Pertanyaan"
              error={
                getFieldState(`questions.${index}.question`).error?.message
              }
              register={{
                ...register(`questions.${index}.question`, {
                  required: 'Masukkan pertanyaan',
                }),
              }}
            />
            <Flex
              gap={4}
              alignItems="center"
              w={{ base: '100%', lg: '50%', xl: '30%' }}
            >
              <CustomInput
                type="select"
                name="type"
                selectOptions={
                  <>
                    <option value="TEXT">Teks</option>
                    <option value="CHECKBOX">Checkbox</option>
                    <option value="RADIO">Radio</option>
                    <option value="RANGE">Skala</option>
                  </>
                }
                error={getFieldState(`questions.${index}.type`).error?.message}
                register={{
                  ...register(`questions.${index}.type`, {
                    required: 'Pilih tipe pertanyaan',
                  }),
                }}
              />
              <BsTrash
                fill="#ff0000"
                onClick={remove}
                className="hover:cursor-pointer w-6 h-6"
              />
            </Flex>
          </Flex>
          <Box
            pr={{
              base: type === 'RANGE' ? 0 : 16,
              sm: type === 'RANGE' ? 0 : 40,
              md: type === 'RANGE' ? 0 : 52,
              lg: type === 'RANGE' ? 0 : 64,
              xl: type === 'RANGE' ? 0 : 96,
            }}
          >
            {type === 'TEXT' && (
              <GenericFormTextInput
                placeholder="Jawaban teks"
                disabled
                _hover={{
                  cursor: 'default',
                }}
              />
            )}
            {(type === 'CHECKBOX' || type === 'RADIO') && (
              <Flex direction="column" gap={4}>
                {fields.map((f, idx) => (
                  <Flex key={idx} gap={4} alignItems="center">
                    {type === 'CHECKBOX' && (
                      <Checkbox isDisabled _hover={{ cursor: 'default' }} />
                    )}
                    {type === 'RADIO' && (
                      <Radio isDisabled _hover={{ cursor: 'default' }} />
                    )}
                    <GenericFormTextInput
                      key={f.id}
                      placeholder="Opsi"
                      px={0}
                      error={
                        getFieldState(`questions.${index}.options.${idx}.label`)
                          .error?.message
                      }
                      register={{
                        ...register(`questions.${index}.options.${idx}.label`, {
                          required: 'Masukkan opsi',
                        }),
                      }}
                    />
                    {fields.length > 1 && (
                      <FiX
                        className="hover:cursor-pointer"
                        onClick={() => removeOption(idx)}
                      />
                    )}
                  </Flex>
                ))}
                <Button
                  type="button"
                  w="fit-content"
                  bgColor="blue.500"
                  color="white"
                  leftIcon={<Icon as={FiPlusCircle} />}
                  onClick={() => append({ label: '' })}
                  _hover={{
                    bgColor: 'blue.600',
                  }}
                >
                  Tambah Opsi
                </Button>
              </Flex>
            )}
            {type === 'RANGE' && (
              <Flex direction="column" gap={4}>
                <Flex
                  direction={{ base: 'column', sm: 'row' }}
                  justifyContent={{ sm: 'space-around' }}
                  w="100%"
                  gap={4}
                  px={{ base: 4, sm: 16 }}
                >
                  {Array(rangeTo - rangeFrom + 1)
                    .fill(0)
                    .map((_, idx) => (
                      <Flex
                        key={idx}
                        direction={{ base: 'row', sm: 'column' }}
                        alignItems="center"
                        gap={2}
                      >
                        <span className="w-5 sm:w-auto">{rangeFrom + idx}</span>
                        <Radio
                          isDisabled
                          _hover={{ cursor: 'default' }}
                        ></Radio>
                      </Flex>
                    ))}
                </Flex>
                <Flex
                  px={{ base: 0, sm: 20, md: 24, lg: 36, xl: 52 }}
                  gap={4}
                  alignItems="center"
                  justifyContent="center"
                >
                  <CustomInput
                    type="select"
                    name="rangeFrom"
                    selectOptions={
                      <>
                        <option value="0">0</option>
                        <option value="1">1</option>
                      </>
                    }
                    error={
                      getFieldState(`questions.${index}.rangeFrom`).error
                        ?.message
                    }
                    register={{
                      ...register(`questions.${index}.rangeFrom`, {
                        valueAsNumber: true,
                        required: 'Masukkan batas bawah skala',
                      }),
                    }}
                  />
                  <span>hingga</span>
                  <CustomInput
                    type="select"
                    name="rangeTo"
                    selectOptions={
                      <>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </>
                    }
                    error={
                      getFieldState(`questions.${index}.rangeTo`).error?.message
                    }
                    register={{
                      ...register(`questions.${index}.rangeTo`, {
                        valueAsNumber: true,
                        required: 'Masukkan batas atas skala',
                      }),
                    }}
                  />
                </Flex>
              </Flex>
            )}
          </Box>
        </Flex>
      </Flex>
    </FormControl>
  );
};
