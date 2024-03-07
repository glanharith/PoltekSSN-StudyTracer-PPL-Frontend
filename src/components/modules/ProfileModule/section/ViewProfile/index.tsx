import { Button, Flex, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { ProfileInput, ViewProfileProps } from './interface';
import { FiUser } from 'react-icons/fi';
import { PiGraduationCap } from 'react-icons/pi';
import { BsHouseDoor } from 'react-icons/bs';
import { CustomInput } from '@/components/elements';
import { MdPassword } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { axios } from '@/utils';

export const ViewProfile: React.FC<ViewProfileProps> = ({ user }) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInput>();
  const toast = useToast();
  const password = watch('password');
  const handleEditProfile = async (data: ProfileInput) => {
    try{
      const updatedData: any = {
        password: data.confirmPassword,
      };
  
      if (data.name?.trim()) {
        updatedData.name = data.name;
      }
      if (data.alumni.phoneNo?.trim()) {
        updatedData.phoneNo = data.alumni.phoneNo;
      }
      if (data.alumni.address?.trim()) {
        updatedData.address = data.alumni.address;
      }
      if (data.alumni.enrollmentYear.trim()) {
        updatedData.enrollmentYear = parseInt(data.alumni.enrollmentYear);
      }
      await axios.patch('/profile', updatedData);
      toast({
        title: 'Profil berhasil diperbarui!',
        status: 'success',
      });
    }catch(error:any){
      toast({
        title: 'Profil gagal diperbarui!',
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
      gap={6}
    >
      <Text fontSize={{ base: 28, md: 40 }} fontWeight="semibold">
        Edit Profile
      </Text>

      <form
        onSubmit={handleSubmit(handleEditProfile)}
        className="flex flex-col justify-center items-center"
      >
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacingX={{ md: 12, lg: 20 }}
          spacingY={6}
        >
          <CustomInput
            name="name"
            label="Nama Lengkap"
            placeholder="Nama Lengkap"
            defaultValue={user.name}
            icon={FiUser}
            register={{
              ...register('name', {}),
            }}
          />

          <CustomInput
            name="enrollmentYear"
            label="Tahun Masuk"
            placeholder=""
            defaultValue={user?.alumni?.enrollmentYear?.toString()}
            type="select"
            selectOptions={
              <>
                <option>
                  {user?.alumni?.enrollmentYear?.toString()}
                </option>
                {Array.from(
                  { length: new Date().getFullYear() - 1944 },
                  (_, index) => (
                    <option key={index} value={1945 + index}>
                      {1945 + index}
                    </option>
                  ),
                )}
              </>
            }
            icon={PiGraduationCap}
            register={{
              ...register('alumni.enrollmentYear', {}),
            }}
          />

          <CustomInput
            name="phoneNo"
            label="No. Telepon"
            placeholder="No. Telepon"
            defaultValue={user.alumni.phoneNo}
            type="number"
            leftAddon="+62"
            register={{
              ...register('alumni.phoneNo', {}),
            }}
          />

          <CustomInput
            name="password"
            label="Password Baru"
            placeholder="Password"
            type="password"
            icon={MdPassword}
            register={{
              ...register('password', {}),
            }}
          />

          <CustomInput
            name="address"
            label="Alamat"
            placeholder="Alamat"
            defaultValue={user.alumni.address}
            icon={BsHouseDoor}
            register={{
              ...register('alumni.address', {}),
            }}
          />

          <CustomInput
            name="confirmPassword"
            label="Konfirmasi Password"
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

        <Flex align="center" pt={20} gap={10}>
          <Button
            colorScheme="blue"
            style={{
              width: '156px',
              height: '40px',
              borderRadius: '6px',
              border: '1px solid var(--gray-500, #718096)',
              background: 'var(--white, #FFF)',
              color: 'var(--gray-500, #718096)',
            }}
            onClick={() => history.back()}
          >
            Kembali
          </Button>
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