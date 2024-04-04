import { FormEditor } from '@/components/elements';
import React, { useEffect, useState } from 'react';
import { EditSurveyModuleProps } from './interface';
import axios from '@/utils/axios';
import { Spinner, useToast } from '@chakra-ui/react';
import { FormEditorInput } from '@/components/elements/FormEditor/interface';

export const EditSurveyModule: React.FC<EditSurveyModuleProps> = ({ id }) => {
  const toast = useToast();

  const [form, setForm] = useState<FormEditorInput>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchForm = async () => {
      try {
        const response = await axios.get('/survey/' + id);

        let { questions, ...formDetails } = await response.data;

        questions = questions.map((q: any) => {
          const { options, ...questionDetails } = q;
          return {
            ...questionDetails,
            updateOptions: options,
          };
        });

        setForm({ ...formDetails, updateQuestions: questions });

        setLoading(false);
      } catch (error) {
        toast({
          title: 'Gagal',
          description: 'Gagal memuat daftar program studi!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
    if (loading) {
      fetchForm();
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner
          size="xl"
          emptyColor="gray.200"
          color="blue.500"
          thickness="4px"
        />
      </div>
    );
  }

  if (form?.startTime) {
    form.startTime = form.startTime.toLocaleString().slice(0, 16);
  }
  if (form?.endTime) {
    form.endTime = form.endTime.toLocaleString().slice(0, 16);
  }

  return <FormEditor existingData={form} id={id} />;
};
