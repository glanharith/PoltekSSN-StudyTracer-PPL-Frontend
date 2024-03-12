import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

export default function Home() {
  return (
    <Flex px={{ base: 4, md: 16 }} pt={4} gap={16} justifyItems="center">
      <section className="hidden md:flex w-full md:w-1/2 flex-col min-h-screen">
        <Text
          color="blue.900"
          fontWeight="bold"
          fontSize={{ base: 40, md: 64 }}
        >
          Welcome!
        </Text>
        <Text>
          Untuk memulai, silahkan lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed eros eros, imp erdiet vitae volutpat a,
          consectetur sed elit. Vivamus dolor arcu, cursus in arcu nec, faucibus
          gravida dui.
        </Text>
      </section>
    </Flex>
  );
}
