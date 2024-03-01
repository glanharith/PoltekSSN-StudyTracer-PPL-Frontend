import { Button, Flex, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { RegisterInput, StudyProgram } from './interface';
import { FiMail, FiUser } from 'react-icons/fi';
import { MdPassword } from 'react-icons/md';
import { PiGraduationCap, PiCertificate } from 'react-icons/pi';
import { BsBook, BsGenderAmbiguous, BsHouseDoor } from 'react-icons/bs';
import { CustomInput } from '@/components/elements';
import { useRouter } from 'next/router';
import { axios } from '@/utils';
import { useEffect, useState } from 'react';

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
  const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([]);

  const handleFormSubmit = async (data: RegisterInput) => {
    data.enrollmentYear = Number(data.enrollmentYear);
    data.graduateYear = data.graduateYear ? Number(data.graduateYear) : -1;
    try {
      await axios.post(`/auth/register`, {
        ...data,
        role: 'ALUMNI',
      });
      toast({
        title: 'Berhasil mendaftar!',
        status: 'success',
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
      });
    }
  };

  const fetchStudyPrograms = async () => {
    const result = await axios.get('/prodi');
    setStudyPrograms(result.data.data);
  };

  useEffect(() => {
    fetchStudyPrograms();
  }, []);

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
          <CustomInput
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

          <CustomInput
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

          <CustomInput
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

          <CustomInput
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

          <CustomInput
            name="enrollmentYear"
            label="Tahun Masuk"
            placeholder="Tahun Masuk"
            type="number"
            error={errors.enrollmentYear?.message}
            icon={PiGraduationCap}
            register={{
              ...register('enrollmentYear', {
                required: 'Masukkan tahun masuk Anda',
                validate: (value) => value >= 1945 || 'Tahun tidak valid',
              }),
            }}
          />

          <CustomInput
            name="graduateYear"
            label="Tahun Lulus"
            placeholder="Tahun Lulus"
            type="number"
            error={errors.graduateYear?.message}
            icon={PiCertificate}
            register={{
              ...register('graduateYear', {
                validate: (value: number | string) => {
                  if (value !== undefined && value !== null && value !== '') {
                    return Number(value) >= 1945 || 'Tahun tidak valid';
                  }
                  return true;
                },
              }),
            }}
          />

          <CustomInput
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

          <CustomInput
            name="phoneNo"
            label="No. Telepon"
            placeholder="No. Telepon"
            type="number"
            error={errors.phoneNo?.message}
            leftAddon="+62"
            register={{
              ...register('phoneNo', {
                required: 'Masukkan no. telepon Anda',
              }),
            }}
          />

          <CustomInput
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

          <CustomInput
            name="studyProgramId"
            label="Jurusan"
            placeholder="Jurusan"
            type="select"
            selectOptions={studyPrograms.map((prodi) => (
              <option key={prodi.id} value={prodi.id}>
                {prodi.name}
              </option>
            ))}
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
