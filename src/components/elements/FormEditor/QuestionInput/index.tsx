import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Icon,
  Radio,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { GenericFormTextInput } from '../GenericFormTextInput';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { CustomInput } from '../..';
import { BsTrash } from 'react-icons/bs';
import React, { useEffect } from 'react';
import { QuestionInputProps } from './interface';
import { FiPlusCircle, FiX } from 'react-icons/fi';

export const QuestionInput: React.FC<QuestionInputProps> = ({
  method,
  remove,
  index,
}) => {
  const { register, watch, control, getFieldState, setValue, getValues } =
    useFormContext();
  const type = watch(`${method}Questions.${index}.type`);
  const rangeFrom = watch(`${method}Questions.${index}.rangeFrom`);
  const rangeTo = watch(`${method}Questions.${index}.rangeTo`);

  // old option method
  // const {
  //   fields,
  //   append,
  //   remove: removeOption,
  // } = useFieldArray({
  // name: `${method}Questions.${index}.options`,
  //   control,
  // });

  // new opition methods
  const {
    fields: newOptionFields,
    append: appendNewOption,
    remove: removeNewOption,
  } = useFieldArray({
    name: `${method}Questions.${index}.newOptions`,
    // name: `${method}Questions.${index}.${method === 'new' ? 'options' : 'newOptions'}`,
    keyName: 'uid',
    control,
  });

  const { fields: updateOptionFields, remove: removeUpdateOption } =
    useFieldArray({
      name: `${method}Questions.${index}.updateOptions`,
      keyName: 'uid',
      control,
    });

  const { append: deleteExistingOption } = useFieldArray({
    name: `${method}Questions.${index}.deleteOptions`,
    keyName: 'uid',
    control,
  });

  useEffect(() => {
    if (type === 'TEXT' || type === 'RANGE') {
      removeUpdateOption();
      removeNewOption();
      deleteExistingOption(
        getValues(`${method}Questions.${index}.updateOptions`),
      );
    }
    if (
      (type === 'CHECKBOX' || type === 'RADIO') &&
      updateOptionFields.length < 1 &&
      newOptionFields.length < 1
    )
      appendNewOption({ label: '' });
    if (method === 'new' && type === 'RANGE') {
      setValue(`${method}Questions.${index}.rangeFrom`, 1);
      setValue(`${method}Questions.${index}.rangeTo`, 3);
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
                getFieldState(`${method}Questions.${index}.question`).error
                  ?.message
              }
              register={{
                ...register(`${method}Questions.${index}.question`, {
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
                error={
                  getFieldState(`${method}Questions.${index}.type`).error
                    ?.message
                }
                register={{
                  ...register(`${method}Questions.${index}.type`, {
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
                {updateOptionFields.map((f, idx) => (
                  <Flex key={idx} gap={4} alignItems="center">
                    {type === 'CHECKBOX' && (
                      <Checkbox isDisabled _hover={{ cursor: 'default' }} />
                    )}
                    {type === 'RADIO' && (
                      <Radio isDisabled _hover={{ cursor: 'default' }} />
                    )}
                    <GenericFormTextInput
                      key={f.uid}
                      placeholder="Opsi"
                      px={0}
                      error={
                        getFieldState(
                          `${method}Questions.${index}.updateOptions.${idx}.label`,
                        ).error?.message
                      }
                      register={{
                        ...register(
                          `${method}Questions.${index}.updateOptions.${idx}.label`,
                          {
                            required: 'Masukkan opsi',
                          },
                        ),
                      }}
                    />
                    {updateOptionFields.length > 1 && (
                      <FiX
                        className="hover:cursor-pointer"
                        onClick={() => {
                          if (
                            getValues(
                              `${method}Questions.${index}.updateOptions.${idx}.id`,
                            )
                          )
                            deleteExistingOption({
                              id: getValues(
                                `${method}Questions.${index}.updateOptions.${idx}.id`,
                              ),
                            });
                          removeUpdateOption(idx);
                        }}
                      />
                    )}
                  </Flex>
                ))}

                {newOptionFields.map((f, idx) => (
                  <Flex key={idx} gap={4} alignItems="center">
                    {type === 'CHECKBOX' && (
                      <Checkbox isDisabled _hover={{ cursor: 'default' }} />
                    )}
                    {type === 'RADIO' && (
                      <Radio isDisabled _hover={{ cursor: 'default' }} />
                    )}
                    <GenericFormTextInput
                      key={f.uid}
                      placeholder="Opsi"
                      px={0}
                      error={
                        getFieldState(
                          `${method}Questions.${index}.newOptions.${idx}.label`,
                        ).error?.message
                      }
                      register={{
                        ...register(
                          `${method}Questions.${index}.newOptions.${idx}.label`,
                          {
                            required: 'Masukkan opsi',
                          },
                        ),
                      }}
                    />
                    {updateOptionFields.length + newOptionFields.length > 1 && (
                      <FiX
                        className="hover:cursor-pointer"
                        onClick={() => removeNewOption(idx)}
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
                  onClick={() => appendNewOption({ label: '' })}
                  _hover={{
                    bgColor: 'blue.600',
                  }}
                >
                  Tambah Opsi
                </Button>
              </Flex>
            )}

            {type === 'RANGE' && (
              <Flex direction="column" gap={8}>
                <Slider
                  min={rangeFrom}
                  max={rangeTo}
                  value={Math.floor((rangeFrom + rangeTo) / 2)}
                  mt={4}
                  isDisabled
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                  {Array.from(
                    { length: (rangeTo as number) - (rangeFrom as number) + 1 },
                    (_, index) => {
                      const value = (rangeFrom as number) + index;
                      return (
                        <SliderMark key={index} value={value} mt={2}>
                          {value}
                        </SliderMark>
                      );
                    },
                  )}
                </Slider>
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
                      getFieldState(`${method}Questions.${index}.rangeFrom`)
                        .error?.message
                    }
                    register={{
                      ...register(`${method}Questions.${index}.rangeFrom`, {
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
                      getFieldState(`${method}Questions.${index}.rangeTo`).error
                        ?.message
                    }
                    register={{
                      ...register(`${method}Questions.${index}.rangeTo`, {
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
