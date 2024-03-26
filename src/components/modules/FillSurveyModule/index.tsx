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
import { Survey } from './interface';
import { axios } from '@/utils';

interface Props {
  surveyId: string;
}

const SurveyForm: React.FC<Props> = ({ surveyId }) => {
  const [survey, setSurvey] = useState<Survey | undefined>();
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const toast = useToast();

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get('/survey/get/' + surveyId);
        setSurvey(response.data);
      } catch (error) {
        toast({
          title: 'Gagal',
          description: 'Gagal memuat daftar kepala program studi',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchSurvey();
  }, [surveyId, toast]);

  const handleRadioChange = (questionId: string, optionLabel: string) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: optionLabel });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(selectedOptions);
  };

  return (
    <Box>
      <Flex justify={'center'}>
        <Box p={4} w={'50%'}>
          {survey && (
            <Flex flexDirection={'column'} gap={'16px'}>
              <Box rounded={'md'} bgColor={'white'} padding={'20px'}>
                <Heading textColor={'black'} mb={4}> {survey.title}</Heading>
                <Box textColor={'black'} mb={4}>{survey.description}</Box>
              </Box>
              <Box rounded={'md'} bgColor={'white'} padding={'16px'}>
                <Text textColor={'gray.500'} fontStyle={'italic'}>
                  Silahkan isi pertanyaan-pertanyaan berikut ini dengan jawaban yang sesuai.
                </Text>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    {survey.questions.map((question) => (
                      <FormControl key={question.id}>
                        <FormLabel htmlFor={question.id}>{question.order+1}. {question.question}</FormLabel>
                        {question.type === 'TEXT' && (
                          <Input outline={'16px'} type="text" id={question.id} name={question.id} />
                        )}
                        {question.type === 'CHECKBOX' && (
                          <Stack spacing={2}>
                            {question.option?.map((option) => (
                              <Checkbox key={option.id} name={option.id} value={option.label}>
                                {option.label}
                              </Checkbox>
                            ))}
                          </Stack>
                        )}
                        {question.type === 'RADIO' && (
                          <Stack spacing={2}>
                            {question.option?.map((option) => (
                              <Radio
                                key={option.id}
                                name={question.id}
                                value={option.label}
                                isChecked={selectedOptions[question.id] === option.label}
                                onChange={() => handleRadioChange(question.id, option.label)}
                              >
                                {option.label}
                              </Radio>
                            ))}
                          </Stack>
                        )}
                        {question.type === 'RANGE' && (
                          <Box>
                            <Slider aria-label={question.question} id={question.id} defaultValue={question.rangeFrom} min={question.rangeFrom} max={question.rangeTo}>
                              <SliderTrack>
                                <SliderFilledTrack />
                              </SliderTrack>
                              <SliderThumb />
                              {Array.from({ length: question.rangeTo as number - (question.rangeFrom as number) + 1 }, (_, index) => (
                                <SliderMark key={index} value={question.rangeFrom as number + index}>
                                  {question.rangeFrom as number + index}
                                </SliderMark>
                              ))}
                            </Slider>
                          </Box>
                        )}
                      </FormControl>
                    ))}
                    <Button type="submit" colorScheme="blue">
                      Submit
                    </Button>
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
