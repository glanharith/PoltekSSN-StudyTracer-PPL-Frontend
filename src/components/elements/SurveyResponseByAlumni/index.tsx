import React, { useState, useEffect } from 'react';
import { axios } from '@/utils';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  Stack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  SliderMark,
  Flex,
  useToast,
  Text,
} from '@chakra-ui/react';
import {
  SurveyResponse,
  SurveyResponseProps,
} from '@/components/modules/ResponseModule/interface';

export default function SurveyResponseByAlumni({
  surveyId,
  role,
}: SurveyResponseProps) {
  const [responses, setResponses] = useState<SurveyResponse>();
  const [currentAlumniIndex, setCurrentAlumniIndex] = useState(0);
  const toast = useToast();
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    fetchResponse();
  }, []);

  const fetchResponse = async () => {
    try {
      const response = await axios.get(
        `/survey/${surveyId as string}/response-preview/alumni`,
      );
      setResponses(response.data.data);
    } catch (error) {
      toast({
        title: 'Gagal',
        description: 'Gagal memuat tanggapan',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleNextAlumni = () => {
    setCurrentAlumniIndex((prevIndex) => {
      if (
        responses?.alumniResponse &&
        prevIndex < responses.alumniResponse.length - 1
      ) {
        return prevIndex + 1;
      } else {
        return prevIndex;
      }
    });
  };

  const handlePreviousAlumni = () => {
    setCurrentAlumniIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return prevIndex;
      }
    });
  };

  const currentAlumni = responses?.alumniResponse[currentAlumniIndex];

  const handleCheckboxChange = (questionId: string, optionId: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      const currentSelections = prevSelectedOptions[questionId] ?? [];
      const updatedSelections = currentSelections.includes(optionId)
        ? currentSelections.filter(
            (selectedOptionId) => selectedOptionId !== optionId,
          )
        : [...currentSelections, optionId];
      return {
        ...prevSelectedOptions,
        [questionId]: updatedSelections,
      };
    });
  };

  const handleRadioChange = (questionId: string, optionId: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: [optionId],
    });
  };

  return (
    <Box>
      <Flex justify={'center'}>
        <Box p={4} w={{ base: '90%', lg: '50%' }}>
          {currentAlumni ? (
            <Flex flexDirection={'column'} gap={'16px'}>
              <Flex justify="space-between">
                <Button
                  size={'sm'}
                  colorScheme="blue"
                  onClick={() => {
                    handlePreviousAlumni();
                    setSelectedOptions({});
                  }}
                  isDisabled={currentAlumniIndex === 0}
                >
                  Sebelumnya
                </Button>
                {role === 'ADMIN' ? (
                  <Text alignSelf="center">{`${currentAlumniIndex + 1} dari ${
                    responses?.alumniResponse.length ?? 0
                  }`}</Text>
                ) : (
                  <Text alignSelf="center">{`${currentAlumniIndex + 1} dari ${
                    responses?.alumniResponse.length ?? 0
                  } | ${
                    responses?.alumniResponse[currentAlumniIndex]
                      ?.studyProgramName ?? ''
                  }`}</Text>
                )}
                <Button
                  size={'sm'}
                  colorScheme="blue"
                  onClick={() => {
                    handleNextAlumni();
                    setSelectedOptions({});
                  }}
                  isDisabled={
                    currentAlumniIndex ===
                    (responses?.alumniResponse.length ?? 0) - 1
                  }
                >
                  Selanjutnya
                </Button>
              </Flex>
              <Box rounded={'md'} bgColor={'white'} padding={'20px'}>
                <Heading textColor={'black'} mb={2} fontSize="lg">
                  {currentAlumni.name}
                </Heading>
                <table style={{ fontSize: '14px' }}>
                  <tbody>
                    <tr>
                      <td>
                        <b>NPM</b>
                      </td>
                      <td>:</td>
                      <td>{currentAlumni.npm}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Tahun Masuk</b>
                      </td>
                      <td>:</td>
                      <td>{currentAlumni.enrollmentYear}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Tahun Lulus</b>
                      </td>
                      <td>:</td>
                      <td>{currentAlumni.graduateYear}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Program Studi</b>
                      </td>
                      <td>:</td>
                      <td>{currentAlumni.studyProgramName}</td>
                    </tr>
                  </tbody>
                </table>
              </Box>

              <Box rounded={'md'} bgColor={'white'} padding={'16px'}>
                <form role={'form'}>
                  <Stack spacing={8}>
                    {responses?.questions.map((question, idx) => {
                      const alumniAnswer = currentAlumni?.answers.find(
                        (answer) => answer.questionId === question.id,
                      )?.answer;
                      return (
                        <FormControl key={question.id}>
                          <FormLabel htmlFor={question.id}>
                            {idx + 1}. {question.question}
                          </FormLabel>
                          {question.type === 'TEXT' && (
                            <Box>
                              <Input
                                outline={'16px'}
                                type="text"
                                id={question.id}
                                name={question.id}
                                defaultValue={alumniAnswer}
                                value={
                                  currentAlumni.answers.find(
                                    (answer) =>
                                      answer.questionId === question.id,
                                  )?.answer || ''
                                }
                                isDisabled={true}
                              />
                            </Box>
                          )}
                          {question.type === 'CHECKBOX' && (
                            <Stack spacing={2}>
                              {question.options?.map((option) => (
                                <Checkbox
                                  key={option.id}
                                  name={question.id}
                                  value={option.label}
                                  isChecked={
                                    selectedOptions[question.id]?.includes(
                                      option.id,
                                    ) ||
                                    currentAlumni.answers.some(
                                      (answer) =>
                                        answer.questionId === question.id &&
                                        answer.answer === option.label,
                                    )
                                  }
                                  onChange={() =>
                                    handleCheckboxChange(question.id, option.id)
                                  }
                                  isDisabled={true}
                                >
                                  {option.label}
                                </Checkbox>
                              ))}
                            </Stack>
                          )}

                          {question.type === 'RADIO' && (
                            <Stack spacing={2}>
                              {question.options?.map((option) => (
                                <Box key={option.id}>
                                  <Radio
                                    key={option.id}
                                    value={option.label}
                                    isChecked={alumniAnswer?.includes(
                                      option.label,
                                    )}
                                    onChange={() =>
                                      handleRadioChange(question.id, option.id)
                                    }
                                    isDisabled={true}
                                  >
                                    {option.label}
                                  </Radio>
                                </Box>
                              ))}
                            </Stack>
                          )}
                          {question.type === 'RANGE' && (
                            <Box>
                              <Text
                                textColor={'gray.500'}
                                fontStyle={'italic'}
                                fontSize={'12'}
                              >
                                Range berikut adalah dari sangat tidak setuju
                                menuju sangat setuju
                              </Text>
                              <Slider
                                aria-label={question.question}
                                id={question.id}
                                defaultValue={parseInt(alumniAnswer ?? '0')}
                                min={question.rangeFrom}
                                max={question.rangeTo}
                                mt={4}
                                value={parseInt(
                                  currentAlumni.answers.find(
                                    (answer) =>
                                      answer.questionId === question.id,
                                  )?.answer ?? '0',
                                )}
                                isDisabled={true}
                              >
                                <SliderTrack>
                                  <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                                {Array.from(
                                  {
                                    length:
                                      (question.rangeTo as number) -
                                      (question.rangeFrom as number) +
                                      1,
                                  },
                                  (_, index) => {
                                    const value =
                                      (question.rangeFrom as number) + index;
                                    return (
                                      <SliderMark
                                        key={index}
                                        value={value}
                                        mt={2}
                                      >
                                        {value}
                                      </SliderMark>
                                    );
                                  },
                                )}
                              </Slider>
                            </Box>
                          )}
                        </FormControl>
                      );
                    })}
                  </Stack>
                </form>
              </Box>
            </Flex>
          ) : (
            <Flex justify="center" align="center">
              <Text>Tidak ada tanggapan dari alumni untuk ditampilkan</Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
