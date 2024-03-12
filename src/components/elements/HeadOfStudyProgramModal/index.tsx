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
import { CustomPasswordInput } from '../CustomPasswordInput';

export default function HeadOfStudyProgramModal({
  isOpen,
  onClose,
  method,
  studyProgramId,
  refetchData,
}: Readonly<KaprodiModalProps>) {

  const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([]);
  const [passwordScore, setPasswordScore] = useState(0);

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
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateHeadOfStudyProgramInput>();

  const password = watch('password');
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
  
        if (res.data.message == 'Successfully created a new head of study program') {
          successMessage = 'Berhasil membuat kepala program studi!';
          toast({
            title: successMessage,
            status: 'success',
          });

          await refetchData()
        }
      } 

      onClose();
    } 
    catch (error: any) {
      const status = error.response?.status;
      let errorMessage;
      if (status === 400) {
        errorMessage = 'Email sudah digunakan!';
        setError('email', { message: errorMessage });
      } 
      else if (method === 'CREATE') {
          errorMessage = 'Gagal membuat kepala program studi!';
          setError('studyProgramId', { message: errorMessage });
      }
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
          Tambah Kepala Program Studi
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
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Email tidak valid',
                  },
                }),
              }}
            />
            <CustomPasswordInput
              label="Password"
              placeholder="Password"
              error={errors.password?.message}
              icon={MdPassword}
              register={{
                ...register('password', {
                  required: 'Masukkan password Anda',
                  minLength: {
                    value: 12,
                    message: 'Password harus minimal 12 karakter',
                  },
                  maxLength: {
                    value: 128,
                    message: 'Password harus maksimal 128 karakter',
                  },
                  validate: () =>
                    passwordScore >= 3 ||
                    'Harap gunakan password yang lebih kuat',
                }),
              }}
              withValidation
              password={password}
              scoreCallback={(score) => {
                setPasswordScore(score);
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
              Buat
            </Button>
          </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
