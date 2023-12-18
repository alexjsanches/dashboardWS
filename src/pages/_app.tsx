// _app.tsx

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import React from 'react';
import theme from 'theme/theme';
import Snowfall from 'views/admin/default/components/SnowFall'; // Ajuste o caminho conforme a estrutura do seu projeto

import 'styles/Fonts.css';
import 'styles/App.css';
import 'styles/Contact.css';

import 'react-calendar/dist/Calendar.css';
import 'styles/MiniCalendar.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Dashboard World Seg</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
      </Head>
      <Snowfall /> {/* Adicione o componente Snowfall aqui */}
      <React.StrictMode>
        <Component {...pageProps} />
      </React.StrictMode>
    </ChakraProvider>
  );
}

export default MyApp;
