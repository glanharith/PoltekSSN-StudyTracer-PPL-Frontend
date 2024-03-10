import { Flex, useToast, Text, SimpleGrid } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { axios } from '@/utils';
import { Profile } from './interface';
import { ViewProfile } from './section/ViewProfileSection';
import { ChangePassword } from './section/ChangePasswordSection';

export const ProfileModule = () => {
  const toast = useToast();
  const [user, setUser] = useState<Profile>();
  const [currentTab, setCurrentTab] = useState('profile');

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
      direction="column"
      minH={{ base: '100vh', md: '32em' }}
      alignItems="center"
      py={{ base: 10 }}
      gap={6}
    >
      <Text fontSize={{ base: 28, md: 40 }} fontWeight="semibold">
        Edit Profile
      </Text>
      <Flex
        direction="row"
        justify="center"
        gap={6}
        sx={{
          a: {
            display: 'block',
            padding: '8px',
            borderRadius: '4px',
            color: 'gray.500',
            fontWeight: 'medium',
            cursor: 'pointer',
            textDecoration: 'none',
            position: 'relative',
            transition: 'color 0.3s',
          },
          'a.active': {
            color: 'blue.500',
            fontWeight: 'semibold',
            textDecoration: 'none',
          },
          'a.active::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '-4px',
            height: '2px',
            backgroundColor: 'blue.500',
            borderRadius: '2px',
            transform: 'scaleX(0)',
            transition: 'transform 0.3s',
          },
          'a.active:hover::after': {
            transform: 'scaleX(1)',
          },
          'a:not(.active)::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '-4px',
            height: '2px',
            backgroundColor: 'transparent',
            borderRadius: '2px',
            transition: 'background-color 0.3s',
          },
          'a:not(.active):hover::after': {
            backgroundColor: 'gray.500',
            transform: 'scaleX(1)',
          },
        }}
      >
        <a
          href="#"
          onClick={() => setCurrentTab('profile')}
          className={currentTab === 'profile' ? 'active' : ''}
        >
          Data Pribadi
        </a>
        <a
          href="#"
          onClick={() => setCurrentTab('password')}
          className={currentTab === 'password' ? 'active' : ''}
        >
          Ubah Password
        </a>
      </Flex>
      {currentTab === 'profile' && (
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
      )}
      {currentTab === 'password' && <ChangePassword />}
    </Flex>
  );
};
