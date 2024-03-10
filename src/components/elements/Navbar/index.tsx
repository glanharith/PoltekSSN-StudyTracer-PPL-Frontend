import { ReactNode, useState, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  useToast,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import navStyles from './navbar.module.css';
import { parseUser } from '@/utils';
import { useRouter } from 'next/router';

const defaultUserMenu = [
  {
    name: 'Survey Kurikulum',
    path: '/survey-kurikulum',
    role: 'ALUMNI',
  },
  {
    name: 'Survey Karir',
    path: '/survey-karir',
    role: 'ALUMNI',
  },
  {
    name: 'Survey Management',
    path: '/survey',
    role: 'ADMIN',
  },
  {
    name: 'Prodi Management',
    path: '/program-studi',
    role: 'ADMIN',
  },
  {
    name: 'Kaprodi Management',
    path: '/kepala-program-studi',
    role: 'ADMIN',
  },
  {
    name: 'Survey Management',
    path: '/prodi-survey',
    role: 'HEAD_STUDY_PROGRAM',
  },
];

const NavLink = ({ children, path }: { children: ReactNode; path: string }) => (
  <Box
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
  >
    <Link href={path}>{children}</Link>
  </Box>
);

export const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [userRole, setUserRole] = useState('guest');
  const [userMenu, setUserMenu] = useState(defaultUserMenu); // State to store user menu
  const toast = useToast();

  const fetchUser = async () => {
    const user = await parseUser();
    if (!user) {
      setUserRole('guest');
      setUserMenu([]);
    } else {
      setUserRole(user.role);
      // Filter user menu based on user role
      setUserMenu(defaultUserMenu.filter((item) => item.role == user.role));
    }
  };

  useEffect(() => {
    fetchUser();
  }, [router.asPath]);

  const logout = () => {
    localStorage.removeItem('tracer-token');
    toast({
      title: 'Berhasil keluar!',
      status: 'success',
    });
    fetchUser();
  };

  return (
    <div className={navStyles.mobileNav} style={{ zIndex: 999 }}>
      <Box
        className=""
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        rounded={40}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Image
                src="assets/images/poltek-ssn-logo.png"
                boxSize="40px"
                alt="logo"
              />
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {userMenu.map(({ name, path }) => (
                <NavLink key={path} path={path}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {userRole == 'guest' ? (
              <>
                <Button
                  variant={'solid'}
                  colorScheme={''}
                  border="2px"
                  borderColor={'blue.900'}
                  size={'sm'}
                  mr={4}
                  textColor={'blue.900'}
                  onClick={() => {
                    router.replace('/register');
                  }}
                >
                  Register
                </Button>
                <Button
                  variant={'solid'}
                  bg="#1A365D"
                  textColor={'white'}
                  size={'sm'}
                  mr={4}
                  onClick={() => {
                    router.replace('/login');
                  }}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                <Flex alignItems={'center'}>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                    >
                      <Avatar
                        size={'sm'}
                        src={
                          'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                        }
                      />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Edit Profile</MenuItem>
                      <MenuDivider />
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </>
            )}
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};
