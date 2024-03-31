import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Text,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import React from 'react';
import { CardProps } from './interface';
import { useRouter } from 'next/router';
import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';

export default function SurveyCard({
  survey,
  fillButton,
  deleteButton,
  editButton,
  downloadButton,
  previewButton,
  isDisabled,
}: CardProps) {
  const router = useRouter();

  const navigateToFill = () => {
    router.push('/survey/' + survey.id);
  };

  const navigateToPreview = () => {
    router.push('/survey-management/preview/' + survey.id);
  };

  const handleOpenDeleteModal = () => {};

  const handleOpenEditModal = () => {};

  const formatDate = (date: Date) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  }

  return (
    <Card maxW="sm" margin={5} minH={250} id='survey-card'>
      <CardBody>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
          <Heading size="md" style={{ marginRight: 'auto' }}>
            {survey.title}
          </Heading>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {editButton && (
              <IconButton
                size={'lg'}
                color={'black'}
                background={'transparent'}
                icon={<FiEdit />}
                aria-label={'Edit Survey'}
                onClick={() => handleOpenEditModal()}
                ml={8}
              />
            )}
            {deleteButton && (
              <IconButton
                size={'lg'}
                color={'red'}
                background={'transparent'}
                icon={<BsTrash />}
                aria-label={'Delete Survey'}
                onClick={() => handleOpenDeleteModal()}
              />
            )}
          </div>
        </div>

        <Text color="blue.600" fontSize="sm" fontWeight="bold" mb={2}>
          {formatDate(new Date(survey.startTime))} -{' '}
          {formatDate(new Date(survey.endTime))}
        </Text>
        <Text>{survey.description}</Text>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2">
          {fillButton && (
            <Button
              onClick={navigateToFill}
              variant="solid"
              colorScheme="blue"
              isDisabled={isDisabled}
            >
              Isi Survey
            </Button>
          )}
          {downloadButton && (
            <Button variant="solid" colorScheme="blue">
              Unduh Tanggapan
            </Button>
          )}
          {previewButton && (
            <Button
              onClick={navigateToPreview}
              variant="outline"
              colorScheme="blue"
            >
              Pratinjau
            </Button>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
