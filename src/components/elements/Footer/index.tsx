import React from 'react';
import { Box, Container, Stack, Text } from '@chakra-ui/react';

export const Footer: React.FC = () => {
  return (
    <Box bg={'blue.900'} color={'gray.500'}>
      <Container maxW={'6xl'} py={7}>
        <Text fontSize={'xs'} fontWeight={'semibold'}>
          © 2024 - Politeknik Siber dan Sandi Negara. All Rights Reserved.
        </Text>
      </Container>
    </Box>
  );
};
