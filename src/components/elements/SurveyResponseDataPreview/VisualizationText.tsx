import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { QuestionStat } from './interface';

const VisualizationText: React.FC<{ question: QuestionStat }> = ({ question }) => {
  if (question.questionType !== 'TEXT') return null; // Safeguard for type correctness

  return (
    <Box overflowY="scroll" maxH="200px" p={4} borderColor="gray.200" borderWidth="1px" borderRadius="md" bg="white">
      {(question.data as string[]).map((answer, index) => (
        <Text key={index} mb={2}>{answer}</Text>
      ))}
    </Box>
  );
};

export default VisualizationText;