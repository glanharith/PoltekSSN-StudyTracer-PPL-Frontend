import { Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import FormImage from '../../public/assets/images/form.svg';
import { useRouter } from 'next/navigation';
import { FiLogIn } from 'react-icons/fi';
import { parseUser } from '@/utils';
import { ParsedUser } from '@/utils/parseUser/interface';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<ParsedUser | null>(null);

  const fetchUser = async () => {
    const _user = await parseUser();
    setUser(_user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Flex px={{ base: 4, md: 16 }} gap={16} justifyItems="center">
      <section className="flex w-full min-h-screen">
        <Flex
          direction={'column'}
          w={{ base: 'full', md: '50%' }}
          justify={'center'}
          align={{ base: 'center', md: 'start' }}
          mb={24}
        >
          <Text fontSize={{ base: 24, md: 32 }}>Selamat datang di</Text>
          <Text
            color="blue.900"
            fontWeight="bold"
            fontSize={{ base: 40, md: 64 }}
          >
            Tracer Study!
          </Text>
          {!user && (
            <>
              <Text>Untuk memulai, silakan masuk.</Text>
              <Button
                mt={4}
                variant={'solid'}
                bg="#1A365D"
                textColor={'white'}
                size={'sm'}
                onClick={() => {
                  router.replace('/login');
                }}
                leftIcon={<FiLogIn />}
              >
                Masuk
              </Button>
            </>
          )}
        </Flex>
        <Flex
          visibility={{ base: 'hidden', md: 'visible' }}
          w={{ base: 0, md: '50%' }}
        >
          <Image src={FormImage} alt="Form illustration" />
        </Flex>
      </section>
    </Flex>
  );
}
