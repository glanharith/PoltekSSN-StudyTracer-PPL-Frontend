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
  useToast,
  Box,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { CardProps } from './interface';
import { useRouter } from 'next/router';
import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { formatDate, isArchived, isOngoing } from '@/utils/surveyUtils';
import axios from '@/utils/axios';
import { saveAs } from 'file-saver';
import DeleteSurveyModal from '@/components/elements/DeleteSurveyModal';

export default function SurveyCard({
  survey,
  fillButton,
  deleteButton,
  editButton,
  downloadButton,
  previewButton,
  isDisabled,
  isUpcoming,
  surveyCount,
  refetchData,
}: CardProps) {
  const toast = useToast();
  const router = useRouter();
  const [isDownloading, setDownloading] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const isSurveyActive = isOngoing(
    new Date(survey.startTime),
    new Date(survey.endTime),
  );
  const isSurveyArchived = isArchived(
    new Date(survey.startTime),
    new Date(survey.endTime),
  );

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

  const handleDownloadResponses = async () => {
    setDownloading(true);
    try {
      await axios.get(`/survey/${survey.id}/responses`).then((response) => {
        var blob = new Blob([response.data], {
          type: response.headers['content-type'],
        });
        saveAs(blob, `${survey.title}_Responses.csv`);
      });
    } catch (error) {
      toast({
        title: 'Gagal',
        description: 'Gagal mengunduh tanggapan survey!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDownloading(false);
    }
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
              <Tooltip
                label={
                  !isUpcoming && (isSurveyActive || isSurveyArchived)
                    ? 'Survey sudah dimulai'
                    : ''
                }
              >
                <IconButton
                  size={'lg'}
                  color={'black'}
                  background={'transparent'}
                  icon={<FiEdit />}
                  aria-label={'Edit Survey'}
                  onClick={() => navigateToEdit()}
                  ml={8}
                  isDisabled={
                    !isUpcoming && (isSurveyActive || isSurveyArchived)
                  }
                />
              </Tooltip>
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
        {isUpcoming && (
          <Text color="red.400" fontWeight="bold" mb={2}>
            Masa pengisian belum dimulai
          </Text>
        )}
        <Text>{survey.description}</Text>
        {downloadButton && (
            <Box>
              <Text fontSize={"large"} fontWeight={"bold"}>
                Total responden : {surveyCount}
              </Text>
            </Box>
          )}
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2">
          {fillButton && (
            <Button
              onClick={navigateToFill}
              variant="solid"
              colorScheme="blue"
              isDisabled={isDisabled || isUpcoming}
            >
              Isi Survey
            </Button>
          )}
          {downloadButton && (
            <Button
              isLoading={isDownloading}
              variant="solid"
              colorScheme="blue"
              onClick={handleDownloadResponses}
            >
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
