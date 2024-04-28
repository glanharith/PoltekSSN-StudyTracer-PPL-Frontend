import React, { useState, useEffect } from 'react';
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
import { Survey, SurveyFormProps } from './interface';
import { axios } from '@/utils';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';


const SurveyForm: React.FC<SurveyFormProps> = ({ surveyId, type }) => {
  const [survey, setSurvey] = useState<Survey | undefined>();
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const toast = useToast();
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    if (type == 'FILL') {
      const formData: { [key: string]: number | string } = {};

      survey?.questions.forEach((question) => {
        const questionId = question.id;

        if (question.type == 'RANGE') {
          const sliderElement = document.getElementById(
            'slider-thumb-' + questionId,
          ) as HTMLInputElement;
          if (sliderElement) {
            const sliderSelectedValue = parseFloat(
              sliderElement.ariaValueNow as string,
            );
            formData[questionId] = sliderSelectedValue;
          }
        } else if (question.type == 'RADIO') {
          const radioSelectedValue = selectedOptions[questionId];
          const realValue = radioSelectedValue.split("--")[0]
          formData[questionId] = realValue;
        }
      });
      
      const submission = { ...data, ...formData };

      let toastShown = false;

      Object.entries(submission).forEach(([key, value]) => {
        if (
          !toastShown &&
          (value === false ||
            value === '' ||
            value === undefined ||
            (Array.isArray(value) && value.length === 0))
        ) {
          toastShown = true;
          toast({
            title: 'Warning',
            description: 'Harap isi semua pertanyaan yang ada',
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });
        }
      });

      if (!toastShown) {
        try {
          await axios.post('/survey/fill-survey', submission);
          toast({
            title: 'Sukses',
            description: 'Sukses mengisi survey',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } catch (error: any) {
          toast({
            title: 'Error',
            description: error.response.data.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } finally {
          router.replace('/');
        }
      }
    } else {
      toast({
        title: 'Gagal',
        description: 'Preview tidak bisa melakukan penyimpanan survey',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  };

  useEffect(() => {
    if (surveyId) {
      const fetchSurvey = async () => {
        try {
          let response;
          if (type == 'FILL') {
            response = await axios.get('/survey/get/' + surveyId);
          }
          else {
            response = await axios.get('/survey/' + surveyId);
          }
          setSurvey(response.data);
        } catch (error: any) {
          toast({
            title: 'Gagal',
            description: 'Gagal memuat data survey',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          router.replace('/');
        }
      };

      fetchSurvey();
    }
  }, [surveyId, toast]);

  const handleRadioChange = (questionId: string, optionLabel: string) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: optionLabel });
  };

  return (
    <Box>
      {type === 'PREVIEW' && (
        <Text
          color={'blue.900'}
          fontSize={{ base: 28, md: 30 }}
          fontWeight="bold"
          ml={"40%"}
          paddingTop={5}
          paddingBottom={5}
        >
          Pratinjau Survei
        </Text>
      )}
      <Flex justify={'center'}>
        <Box p={4} w={{ base: '90%', lg: '50%' }}>
          {survey && (
            <Flex flexDirection={'column'} gap={'16px'}>
              <Box rounded={'md'} bgColor={'white'} padding={'20px'}>
                <Heading textColor={'black'} mb={4}>
                  {' '}
                  {survey.title}
                </Heading>
                <Box textColor={'black'} mb={4}>
                  {survey.description}
                </Box>
              </Box>
              <Box rounded={'md'} bgColor={'white'} padding={'16px'}>
                <Text textColor={'gray.500'} fontStyle={'italic'}>
                  Silahkan isi pertanyaan-pertanyaan berikut ini dengan jawaban
                  yang sesuai.
                </Text>
                <form onSubmit={handleSubmit(onSubmit)} role={'form'}>
                  <Stack spacing={8}>
                    {survey.questions.map((question, idx) => (
                      <FormControl key={question.id}>
                        <FormLabel htmlFor={question.id}>
                          {idx + 1}. {question.question}
                        </FormLabel>
                        {question.type === 'TEXT' && (
                          <Box>
                            <Input
                              {...register(question.id)}
                              outline={'16px'}
                              type="text"
                              id={question.id}
                              name={question.id}
                            />
                          </Box>
                        )}
                        {question.type === 'CHECKBOX' && (
                          <Stack spacing={2}>
                            <Text
                              textColor={'gray.500'}
                              fontStyle={'italic'}
                              fontSize={'12'}
                            >
                              Pilih opsi berikut
                            </Text>
                            {question.options?.map((option) => (
                              <Checkbox
                                {...register(question.id)}
                                key={option.id}
                                name={question.id}
                                value={option.label}
                              >
                                {option.label}
                              </Checkbox>
                            ))}
                          </Stack>
                        )}
                        {question.type === 'RADIO' && (
                          <Stack spacing={2}>
                            <Text
                              textColor={'gray.500'}
                              fontStyle={'italic'}
                              fontSize={'12'}
                            >
                              Pilih salah satu
                            </Text>
                            {question.options?.map((option) => (
                              <Box key={option.id}>
                                <Radio
                                  key={option.id}
                                  value={option.label}
                                  isChecked={
                                    selectedOptions[question.id] ===
                                    `${option.label} -- ${option.id}`
                                  }
                                  onChange={() =>
                                    handleRadioChange(question.id, `${option.label} -- ${option.id}`)
                                  }
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
                              defaultValue={question.rangeFrom}
                              min={question.rangeFrom}
                              max={question.rangeTo}
                              mt={4}
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
                    ))}
                    {type === 'FILL' && (
                      <Button type="submit" colorScheme="blue">
                        Submit
                      </Button>
                    )}
                  </Stack>
                </form>
              </Box>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default SurveyForm;
