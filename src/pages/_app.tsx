import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Footer, Navbar } from '@/components/elements';
import theme from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}
