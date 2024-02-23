import { Button, Text, useToast } from '@chakra-ui/react';
import { LoginInput } from './interface';
import { useForm } from 'react-hook-form';
import { CustomAuthInput } from '@/components/elements';
import { FiMail } from 'react-icons/fi';
import { MdPassword } from 'react-icons/md';
import { useRouter } from 'next/router';
import { axios } from '@/utils';

export const FormSection = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>();
  const toast = useToast();
  const router = useRouter();

  const handleFormSubmit = async (data: LoginInput) => {
    try {
      const res = await axios.post('/auth/login', data);
      localStorage.setItem('tracer-token', res.data.token);

      toast({
        title: 'Berhasil masuk!',
        status: 'success',
      });
    } catch (e: any) {
      let errorDescription = '';
      if (e.response.data.message === 'Invalid email or password')
        errorDescription = 'Email atau password tidak tepat';
      toast({
        title: 'Gagal masuk',
        status: 'error',
        description: errorDescription,
      });
    }
  };

  return (
    <section className="w-full md:w-1/2 min-h-screen flex flex-col items-center justify-center gap-6">
      <form
        className="flex flex-col gap-4 items-center bg-white px-8 py-6 md:p-12 rounded-xl"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Text
          fontSize={{ base: 36, md: 44 }}
          fontWeight="semibold"
          color="blue.900"
        >
          Masuk
        </Text>
        <CustomAuthInput
          name="email"
          placeholder="email"
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
          name="password"
          placeholder="password"
          type="password"
          error={errors.password?.message}
          icon={MdPassword}
          register={{
            ...register('password', {
              required: 'Masukkan password Anda',
            }),
          }}
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          w="full"
          bg="blue.500"
          _hover={{
            bg: 'blue.600',
          }}
          color="white"
          px={12}
        >
          Masuk
        </Button>

        <Text fontWeight="semibold" pt={4}>
          Belum memiliki akun?{' '}
          <span
            className="hover:cursor-pointer text-[#3182CE]"
            onClick={() => router.push('/register')}
          >
            Daftar
          </span>
        </Text>
      </form>
    </section>
  );
};
