import { Flex } from '@chakra-ui/react';
import { FormSection, IntroSection } from './sections';

export const LoginModule = () => {
  return (
    <Flex px={{ base: 4, md: 16 }} gap={16} justifyItems="center">
      <IntroSection />
      <FormSection />
    </Flex>
  );
};
