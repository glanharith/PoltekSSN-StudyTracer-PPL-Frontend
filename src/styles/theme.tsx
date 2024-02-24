import { extendTheme } from '@chakra-ui/react';
import localFont from 'next/font/local';

const plusJakarta = localFont({
  src: '../../public/assets/fonts/PlusJakartaSans.ttf',
  variable: '--font-plus-jakarta',
});

const theme = extendTheme({
  fonts: {
    body: plusJakarta.style.fontFamily,
  },
});

export default theme;
