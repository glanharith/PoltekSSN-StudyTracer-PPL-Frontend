import { Text } from '@chakra-ui/react';

export const IntroSection = () => {
  return (
    <section className="hidden md:flex w-full md:w-1/2 flex-col justify-center min-h-screen">
      <Text color="blue.900" fontWeight="bold" fontSize={{ base: 40, md: 64 }}>
        Tracer Study
      </Text>
      <Text>
        Tracer Study PoltekSSN merupakan lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed eros eros, imp erdiet vitae volutpat a, consectetur
        sed elit. Vivamus dolor arcu, cursus in arcu nec, faucibus gravida dui.
      </Text>
    </section>
  );
};
