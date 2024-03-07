import { Flex, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { axios } from '@/utils';
import { Profile } from './interface';
import { ViewProfile } from './section/ViewProfile';

export const ProfileModule = () => {
  const toast = useToast();
  const [user, setUser] = useState<Profile>();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/profile');
      setUser(response.data.data);
    } catch (error) {
      toast({
        title: 'Gagal',
        description: 'Gagal memuat user',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      className="min-h-screen"
      px={{ base: 4, md: 16 }}
      gap={4}
      flexDirection={'column'}
      justifyItems="center"
      padding={4}
    >
      <ViewProfile
        user={{
          name: user?.name,
          alumni: {
            phoneNo: user?.alumni.phoneNo,
            address: user?.alumni.address,
            enrollmentYear: user?.alumni.enrollmentYear,
          },
        }}
      />
    </Flex>
  );
};
