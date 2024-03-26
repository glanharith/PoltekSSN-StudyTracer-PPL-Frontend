import React from 'react';
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
} from '@chakra-ui/react';
import { Survey } from './interface';

interface Props {
  survey: Survey;
}

const SurveyForm: React.FC<Props> = ({ survey }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <Box p={4}>
      <Heading mb={4}>{survey.title}</Heading>
      <Box mb={4}>{survey.description}</Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {survey.questions.map((question) => (
            <FormControl key={question.id}>
              <FormLabel htmlFor={question.id}>{question.question}</FormLabel>
              {question.type === 'TEXT' && (
                <Input type="text" id={question.id} name={question.id} />
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
                    <Radio key={option.id} name={question.id} value={option.label}>
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
  );
};

export default SurveyForm;
