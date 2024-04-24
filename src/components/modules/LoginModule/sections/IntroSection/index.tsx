import { Text } from '@chakra-ui/react';

export const IntroSection = () => {
  return (
    <section className="hidden md:flex w-full md:w-1/2 flex-col justify-center min-h-screen">
      <Text color="blue.900" fontWeight="bold" fontSize={{ base: 40, md: 64 }}>
        Tracer Study
      </Text>
      <Text>
        <span className="font-semibold text-[#1a365d]">Tracer Study</span>{' '}
        adalah situs web pengisian form/survey milik{' '}
        <span className="font-semibold text-[#1a365d]">PoltekSSN</span> untuk
        berbagai keperluan.
      </Text>
    </section>
  );
};
