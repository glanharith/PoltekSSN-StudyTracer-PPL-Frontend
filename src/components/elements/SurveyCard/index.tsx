import { Card, CardBody, CardFooter } from '@chakra-ui/react';
import React from 'react';
import { CardProps } from './interface';

export default function SurveyCard({
  survey,
  fillButton,
  deleteButton,
  editButton,
  downloadButton,
  previewButton,
  isDisabled,
}: CardProps) {
  return (
    <Card>
      <CardBody></CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}
