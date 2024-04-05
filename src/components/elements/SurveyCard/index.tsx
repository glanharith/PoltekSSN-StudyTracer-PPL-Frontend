import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Text,
  Heading,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { CardProps } from './interface';
import { useRouter } from 'next/router';
import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { formatDate } from '@/utils/surveyUtils';
import DeleteSurveyModal from '@/components/elements/DeleteSurveyModal';

export default function SurveyCard({
  survey,
  fillButton,
  deleteButton,
  editButton,
  downloadButton,
  previewButton,
  isDisabled,
  refetchData,
}: CardProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const isSurveyActive =
    new Date() >= new Date(survey.startTime) &&
    new Date() <= new Date(survey.endTime);

  const navigateToFill = () => {
    router.push('/survey/' + survey.id);
  };

  const navigateToPreview = () => {
    router.push('/survey-management/preview/' + survey.id);
  };

  const navigateToEdit = () => {
    router.push('/survey-management/edit/' + survey.id);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Card maxW="sm" margin={5} minH={250} id="survey-card">
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
                onClick={() => navigateToEdit()}
                ml={8}
              />
            )}
            {deleteButton && (
              <Tooltip
                label={isSurveyActive ? 'Survey sedang berlangsung' : ''}
              >
                <IconButton
                  size={'lg'}
                  color={isSurveyActive ? 'gray' : 'red'}
                  background={'transparent'}
                  icon={<BsTrash />}
                  aria-label={'Delete Survey'}
                  onClick={() => handleOpenDeleteModal()}
                  isDisabled={isSurveyActive}
                />
              </Tooltip>
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
      <DeleteSurveyModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        dataToBeDeleted={survey.id}
        refetchData={refetchData}
      />
    </Card>
  );
}
