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
import { useForm } from 'react-hook-form';


interface Props {
  surveyId: string;
}

const SurveyForm: React.FC<Props> = ({ surveyId }) => {
  const [survey, setSurvey] = useState<Survey | undefined>();
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const toast = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm();

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

  const handleSubmite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData: { [key: string]: string | string[] | number } = {};
  
    // Iterate through each question in the survey
    survey?.questions.forEach((question) => {
      const questionId = question.id;
  
      // Handle different question types
      switch (question.type) {
        case 'TEXT':
          const textInputValue = (document.getElementById(questionId) as HTMLInputElement).value;
          formData[questionId] = textInputValue;
          break;

        case 'CHECKBOX':
          const checkboxInputs = document.querySelectorAll(`input[name="${question.id}"]:checked`);
          const checkboxValues = Array.from(checkboxInputs).map((checkbox) => {
            return (checkbox as HTMLInputElement).value;
          });
          formData[question.id] = checkboxValues;
          break;
  
        case 'RADIO':
          const radioSelectedValue = selectedOptions[questionId];
          formData[questionId] = radioSelectedValue;
          break;
  
        case 'RANGE':
          const sliderElement = document.getElementById("slider-thumb-" + questionId) as HTMLInputElement;
          if (sliderElement) {
            const sliderSelectedValue = parseFloat(sliderElement.ariaValueNow as string);
            formData[questionId] = sliderSelectedValue;
          } 
          break;
  
        default:
          break;
      }
    });
    console.log(formData);
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
                <form onSubmit={handleSubmite}>
                  <Stack spacing={4}>
                    {survey.questions.map((question) => (
                      <FormControl key={question.id}>
                        <FormLabel htmlFor={question.id}>{question.order+1}. {question.question}</FormLabel>
                        {question.type === 'TEXT' && (
                          <Input outline={'16px'} type="text" id={question.id} name={question.id} />
                        )}
                        {question.type === 'CHECKBOX' && (
                          <Stack spacing={2}>
                            <Text textColor={'gray.500'} fontStyle={'italic'} fontSize={'12'}>Pilih opsi berikut</Text>
                            {question.option?.map((option) => (
                              <Checkbox key={option.id} name={question.id} value={option.label}>
                                {option.label}
                              </Checkbox>
                            ))}
                          </Stack>
                        )}
                        {question.type === 'RADIO' && (
                          <Stack spacing={2}>
                            <Text textColor={'gray.500'} fontStyle={'italic'} fontSize={'12'}>Pilih salah satu</Text>
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
                          <Text textColor={'gray.500'} fontStyle={'italic'} fontSize={'12'}>
                            Range berikut adalah dari sangat tidak setuju menuju sangat setuju
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
                            {Array.from({ length: question.rangeTo as number - (question.rangeFrom as number) + 1 }, (_, index) => (
                              <SliderMark key={index} value={question.rangeFrom as number + index} mt={2}>
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
