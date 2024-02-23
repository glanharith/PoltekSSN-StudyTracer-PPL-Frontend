import { Button, Flex, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { RegisterInput } from './interface';
import { FiMail, FiUser } from 'react-icons/fi';
import { MdPassword } from 'react-icons/md';
import { PiGraduationCap, PiCertificate } from 'react-icons/pi';
import { BsBook, BsGenderAmbiguous, BsHouseDoor } from 'react-icons/bs';
import { CustomAuthInput } from '@/components';
import { useRouter } from 'next/router';
import axios from '@/utils/axios';

export const RegisterModule = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>();
  const toast = useToast();
  const router = useRouter();
  const toLogin = () => {
    router.push('/login');
  };

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
      toLogin();
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
          <CustomAuthInput
            name="email"
            label="Email"
            placeholder="Email"
            error={errors.email?.message}
            icon={FiMail}
            register={{
              ...register('email', {
                required: 'Masukkan email Anda',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Email tidak valid',
                },
              }),
            }}
          />

          <CustomAuthInput
            name="name"
            label="Nama Lengkap"
            placeholder="Nama Lengkap"
            error={errors.name?.message}
            icon={FiUser}
            register={{
              ...register('name', {
                required: 'Masukkan nama lengkap Anda',
              }),
            }}
          />

          <CustomAuthInput
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            error={errors.password?.message}
            icon={MdPassword}
            register={{
              ...register('password', {
                required: 'Masukkan password Anda',
              }),
            }}
          />

          <CustomAuthInput
            name="confirmPassword"
            label="Konfirmasi Password"
            placeholder="Konfirmasi Password"
            type="password"
            error={errors.confirmPassword?.message}
            icon={MdPassword}
            register={{
              ...register('confirmPassword', {
                required: 'Masukkan ulang password Anda',
                validate: (value) =>
                  value === password || 'Masukkan password yang sama',
              }),
            }}
          />

          <CustomAuthInput
            name="enrollmentYear"
            label="Tahun Masuk"
            placeholder="Tahun Masuk"
            error={errors.enrollmentYear?.message}
            icon={PiGraduationCap}
            register={{
              ...register('enrollmentYear', {
                required: 'Masukkan tahun masuk Anda',
              }),
            }}
          />

          <CustomAuthInput
            name="graduateYear"
            label="Tahun Lulus"
            placeholder="Tahun Lulus"
            error={errors.graduateYear?.message}
            icon={PiCertificate}
            register={{
              ...register('graduateYear'),
            }}
          />

          <CustomAuthInput
            name="address"
            label="Alamat"
            placeholder="Alamat"
            error={errors.address?.message}
            icon={BsHouseDoor}
            register={{
              ...register('address', {
                required: 'Masukkan alamat Anda',
              }),
            }}
          />

          <CustomAuthInput
            name="phoneNo"
            label="No. Telepon"
            placeholder="No. Telepon"
            error={errors.phoneNo?.message}
            leftAddon="+62"
            register={{
              ...register('phoneNo', {
                required: 'Masukkan no. telepon Anda',
              }),
            }}
          />

          <CustomAuthInput
            name="gender"
            label="Jenis Kelamin"
            placeholder="Jenis Kelamin"
            type="select"
            selectOptions={
              <>
                <option value="MALE">Laki-laki</option>
                <option value="FEMALE">Perempuan</option>
              </>
            }
            error={errors.gender?.message}
            icon={BsGenderAmbiguous}
            register={{
              ...register('gender', {
                required: 'Pilih jenis kelamin Anda',
              }),
            }}
          />

          <CustomAuthInput
            name="studyProgramId"
            label="Jurusan"
            placeholder="Jurusan"
            type="select"
            selectOptions={
              <>
                <option value="48e941a9-3319-4f4c-8a2e-5d6a3287bf89">
                  Ilmu Sandi
                </option>
                <option value="68393bf0-0d80-43a7-889b-c46186a18777">
                  Ilmu Siber
                </option>
              </>
            }
            error={errors.studyProgramId?.message}
            icon={BsBook}
            register={{
              ...register('studyProgramId', {
                required: 'Pilih jurusan Anda',
              }),
            }}
          />
        </SimpleGrid>

        <Flex direction="column" align="center" pt={8} gap={2}>
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
          <Text fontWeight="semibold">
            Sudah memiliki akun?{' '}
            <span
              className="hover:cursor-pointer text-[#3182CE]"
              onClick={toLogin}
            >
              Masuk
            </span>
          </Text>
        </Flex>
      </form>
    </Flex>
  );
};
