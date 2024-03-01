import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftAddon,} from '@chakra-ui/react';

import { axios } from '@/utils';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CreateHeadOfStudyProgramInput, KaprodiModalProps } from './interface';
import { MdEmail, MdPassword, MdSchool, MdTitle } from 'react-icons/md';
import { StudyProgram } from '@/components/modules/RegisterModule/interface';
import { CustomInput } from '../CustomInput';
import { BsBook } from 'react-icons/bs';

export default function HeadOfStudyProgramModal({
  isOpen,
  onClose,
  method,
  studyProgramId,
  refetchData,
}: KaprodiModalProps) {

  const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([]);

  const fetchStudyPrograms = async () => {
    const result = await axios.get('/prodi');
    setStudyPrograms(result.data.data);
  };  

  useEffect(() => {
    fetchStudyPrograms();
  }, []);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateHeadOfStudyProgramInput>({
    defaultValues: {
      name: method === 'EDIT' ? studyProgramId : '',
    },
  });
  const toast = useToast();

  const handleFormSubmit = async (data: CreateHeadOfStudyProgramInput) => {
    try {
      let successMessage: string;
      if (method === 'CREATE') {
        const res = await axios.post('/kaprodi', {
          studyProgramId: data.studyProgramId,
          email: data.email,
          name: data.name,
          password: data.password,
        });
        console.log(res)
  
        if (res.data.message == 'Successfully created a new head of study program') {
          successMessage = 'Berhasil membuat kepala program studi!';
          toast({
            title: successMessage,
            status: 'success',
          });

          setTimeout(() => {
            refetchData();
          }, 1000);
        }

      } 

      onClose();
    } 
    catch (error: any) {
      const status = error.response?.status;
      let errorMessage;
      if (status === 409) {
        errorMessage = 'Nama kepala program studi sudah digunakan!';
      } 
      else if (method === 'CREATE') {
          errorMessage = 'Gagal membuat kepala program studi!';
      }
      setError('name', { message: errorMessage });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={48} p={8}>
        <ModalHeader
          textAlign={'center'}
          textColor={'blue.900'}
          fontSize={'3xl'}
        >
          {method === 'CREATE' ? 'Tambah' : 'Ubah'} Kepala Program Studi
        </ModalHeader>
        <ModalCloseButton p={6} borderRadius={32} />
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ModalBody pb={6}>
            <CustomInput
              name="name"
              label='Nama Kepala Prodi'
              placeholder="Nama Kepala Program Studi"
              error={errors.name?.message}
              icon={MdTitle}
              register={{
                ...register('name', {
                  required: 'Nama kepala program studi tidak boleh kosong!',
                }),
              }}
            />
            <CustomInput
              name="email"
              label='Email Kepala Prodi'
              placeholder="Email"
              error={errors.email?.message}
              icon={MdEmail}
              register={{
                ...register('email', {
                  required: 'Email tidak boleh kosong!',
                }),
              }}
            />
            <CustomInput
              name="password"
              label='Password'
              placeholder="Password"
              error={errors.password?.message}
              icon={MdPassword}
              register={{
                ...register('password', {
                  required: 'password tidak boleh kosong!',
                }),
              }}
            />
            <FormControl isInvalid={!!errors.studyProgramId?.message}>
              <FormLabel>{"Jurusan"}</FormLabel>
              <InputGroup>
              <InputLeftAddon>
                <MdSchool />
              </InputLeftAddon>
                <select aria-label='Jurusan' id="jurusan" {...register("studyProgramId")}>
                {studyPrograms.map((prodi) => (
                  <option key={prodi.id} value={prodi.id}>
                    {prodi.name}
                  </option>
                ))}
              </select>
              </InputGroup>
              <FormErrorMessage>{errors.studyProgramId?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>
        </form>
        <ModalFooter justifyContent={'center'}>
            <Button onClick={onClose} mr={3}>
              Batal
            </Button>
            <Button
              bg="blue.500"
              _hover={{
                bg: 'blue.600',
              }}
              color="white"
              isLoading={isSubmitting}
              onClick={handleSubmit(handleFormSubmit)}
            >
              {method === 'CREATE' ? 'Buat' : 'Ubah'}
            </Button>
          </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
