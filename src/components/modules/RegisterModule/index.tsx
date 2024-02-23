import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { RegisterInput } from './interface';
import { FiMail, FiUser } from 'react-icons/fi';
import { MdPassword } from 'react-icons/md';
import { PiGraduationCap, PiCertificate } from 'react-icons/pi';
import { BsBook, BsGenderAmbiguous, BsHouseDoor } from 'react-icons/bs';
import axios from 'axios';

export const RegisterModule = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>();
  const toast = useToast();

  const handleFormSubmit = async (data: RegisterInput) => {
    data.enrollmentYear = Number(data.enrollmentYear);
    data.graduateYear = data.graduateYear ? Number(data.graduateYear) : -1;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        ...data,
        role: 'ALUMNI',
      });
      toast({
        title: 'Berhasil mendaftar!',
        status: 'success',
        duration: 1500,
      });
    } catch (e: any) {
      let errorDescription = '';
      if (e.response.data.message === 'User with given email already exists') {
        errorDescription = 'Email sudah terdaftar';
      }

      toast({
        title: 'Pendaftaran gagal',
        description: errorDescription,
        status: 'error',
        duration: 1500,
      });
    }
  };

  const password = watch('password');

  return (
    <Flex
      direction="column"
      minH={{ base: '100vh', md: '32em' }}
      alignItems="center"
      py={{ base: 10 }}
      gap={6}
    >
      <Text fontSize={{ base: 28, md: 40 }} fontWeight="semibold">
        Daftar
      </Text>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col justify-center items-center"
      >
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacingX={{ md: 12, lg: 20 }}
          spacingY={6}
        >
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="name">Email</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                <Icon as={FiMail} />
              </InputLeftAddon>
              <Input
                type="text"
                placeholder="Email"
                {...register('email', {
                  required: 'Masukkan email Anda',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Email tidak valid',
                  },
                })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Nama Lengkap</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                <Icon as={FiUser} />
              </InputLeftAddon>
              <Input
                type="text"
                placeholder="Nama Lengkap"
                {...register('name', {
                  required: 'Masukkan nama lengkap Anda',
                })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                <Icon as={MdPassword} />
              </InputLeftAddon>
              <Input
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: 'Masukkan password Anda',
                })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel htmlFor="confirmPassword">Konfirmasi Password</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                <Icon as={MdPassword} />
              </InputLeftAddon>
              <Input
                type="password"
                placeholder="Konfirmasi Password"
                {...register('confirmPassword', {
                  required: 'Masukkan ulang password Anda',
                  validate: (value) =>
                    value === password || 'Masukkan password yang sama',
                })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.enrollmentYear}>
            <FormLabel htmlFor="enrollmentYear">Tahun Masuk</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                <Icon as={PiGraduationCap} />
              </InputLeftAddon>
              <Input
                type="number"
                placeholder="Tahun Masuk"
                {...register('enrollmentYear', {
                  required: 'Masukkan tahun masuk Anda',
                })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.enrollmentYear && errors.enrollmentYear.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.graduateYear}>
            <FormLabel htmlFor="graduateYear">Tahun Lulus</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                <Icon as={PiCertificate} />
              </InputLeftAddon>
              <Input
                type="number"
                placeholder="Tahun Lulus"
                {...register('graduateYear')}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.graduateYear && errors.graduateYear.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.address}>
            <FormLabel htmlFor="address">Alamat</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                <Icon as={BsHouseDoor} />
              </InputLeftAddon>
              <Input
                type="text"
                placeholder="Alamat"
                {...register('address', {
                  required: 'Masukkan alamat Anda',
                })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.address && errors.address.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phoneNo}>
            <FormLabel htmlFor="phoneNo">No. Telepon</FormLabel>
            <InputGroup>
              <InputLeftAddon>+62</InputLeftAddon>
              <Input
                type="text"
                placeholder="No. Telepon"
                {...register('phoneNo', {
                  required: 'Masukkan no. telepon Anda',
                })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.phoneNo && errors.phoneNo.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.gender}>
            <FormLabel htmlFor="gender">Jenis Kelamin</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                <Icon as={BsGenderAmbiguous} />
              </InputLeftAddon>
              <Select
                placeholder="Jenis Kelamin"
                {...register('gender', {
                  required: 'Pilih jenis kelamin Anda',
                })}
              >
                <option value="MALE">Laki-laki</option>
                <option value="FEMALE">Perempuan</option>
              </Select>
            </InputGroup>
            <FormErrorMessage>
              {errors.gender && errors.gender.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.studyProgramId}>
            <FormLabel htmlFor="studyProgram">Jurusan</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                <Icon as={BsBook} />
              </InputLeftAddon>
              <Select
                placeholder="Jurusan"
                {...register('studyProgramId', {
                  required: 'Pilih jurusan Anda',
                })}
              >
                <option value="48e941a9-3319-4f4c-8a2e-5d6a3287bf89">
                  Ilmu Sandi
                </option>
                <option value="68393bf0-0d80-43a7-889b-c46186a18777">
                  Ilmu Siber
                </option>
              </Select>
            </InputGroup>
            <FormErrorMessage>
              {errors.studyProgramId && errors.studyProgramId.message}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <Flex direction="column" align="center" pt={6}>
          <Button
            type="submit"
            isLoading={isSubmitting}
            bg="blue.500"
            _hover={{
              bg: 'blue.600',
            }}
            color="white"
            px={12}
          >
            Daftar
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
