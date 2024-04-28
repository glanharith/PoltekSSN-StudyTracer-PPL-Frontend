import {
  Button,
  Flex,
  SimpleGrid,
  useToast,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { PasswordInput } from './interface';
import { FiAlertTriangle } from 'react-icons/fi';
import { CustomInput } from '@/components/elements';
import { MdPassword } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { axios } from '@/utils';
import { useState } from 'react';
import { CustomPasswordInput } from '@/components/elements/CustomPasswordInput';
export const ChangePassword = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PasswordInput>();
  const toast = useToast();
  const password = watch('password');
  const [passwordScore, setPasswordScore] = useState(0);
  const handleChangePassword = async (data: PasswordInput) => {
    try {
      const updatedData: any = {
        currentPassword: data.currentPassword,
        password: data.confirmPassword,
      };
      await axios.patch('/profile', updatedData);
      toast({
        title: 'Profil berhasil diperbarui!',
        status: 'success',
      });
    } catch (error: any) {
      toast({
        title: 'Profil gagal diperbarui, password lama salah!',
        status: 'error',
      });
    }
  };

  return (
    <Flex
      direction="column"
      minH={{ base: '100vh', md: '32em' }}
      alignItems="center"
      py={{ base: 10 }}
      gap={5}
    >
      <Alert
        status="warning"
        w="fit-content"
        alignSelf="flex-start"
        rounded="md"
      >
        <AlertIcon as={FiAlertTriangle} color="yellow.400" />
        Isi jika Anda ingin mengubah password.
      </Alert>
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="flex flex-col justify-center items-center"
      >
        <SimpleGrid columns={{ base: 1, md: 1 }} spacingY={6}>
          <CustomInput
            name="oldPassword"
            label="Password Lama"
            placeholder="Password Lama"
            type="password"
            icon={MdPassword}
            error={errors.currentPassword?.message}
            register={{
              ...register('currentPassword', {
                required: 'Masukkan Password Lama Anda',
              }),
            }}
          />

            <CustomPasswordInput
              label="Password Baru"
              placeholder="Password Baru"
              error={errors.password?.message}
              icon={MdPassword}
              register={{
                ...register('password', {
                  required: 'Masukkan password baru Anda',
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

          <CustomInput
            name="confirmPassword"
            label="Konfirmasi Password Baru"
            placeholder="Konfirmasi Password"
            type="password"
            icon={MdPassword}
            error={errors.confirmPassword?.message}
            register={{
              ...register('confirmPassword', {
                validate: (value) =>
                  value === password || 'Masukkan password yang sama',
              }),
            }}
          />
        </SimpleGrid>

        <Flex align="center" pt={10} gap={10}>
          <Button
            type="submit"
            isLoading={isSubmitting}
            colorScheme="blue"
            style={{
              width: '156px',
              height: '40px',
              borderRadius: '6px',
            }}
          >
            Simpan
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
