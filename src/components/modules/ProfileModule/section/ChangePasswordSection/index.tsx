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
export const ChangePassword = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PasswordInput>();
  const toast = useToast();
  const password = watch('password');
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

          <CustomInput
            name="newPassword"
            label="Password Baru"
            placeholder="Password Baru"
            type="password"
            icon={MdPassword}
            error={errors.password?.message}
            register={{
              ...register('password', {
                required: 'Masukkan Password Baru Anda',
              }),
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
