import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';
import Bloco1 from 'views/admin/profile/components/bloco1';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import Bloco2 from 'views/admin/profile/components/bloco2';
import CustomToastWithConfetti from 'views/admin/profile/components/confetti';
import 'styles/Fade.module.css';

export default function ProfileOverview() {
  const screens = [
    {
      type: 'content', // 'content' para conteúdo atual, 'gif' para GIF
      duration: 3 * 60 * 1000, // Duração em milissegundos (2 minutos)
      content: (
        <Grid
          templateColumns={{
            base: '1fr',
            lg: '2.5fr 2.5fr 2.5fr',
          }}
          templateRows={{
            base: 'repeat(3, 1fr)',
            lg: '1fr',
          }}
          gap={{ base: '20px', xl: '20px' }}
        >
          <DailyTraffic />
          <Bloco1 />
          <Bloco2 />
        </Grid>
      ),
    },
    {
      type: 'gif',
      duration: 0.5 * 60 * 1000, // Duração em milissegundos (1 minuto)
      content: (
        <img
          src="/img/resultado.gif"
          alt="GIF"
          style={{ width: '100%', height: 'auto' }}
        />
      ),
    },
    {
      type: 'gif',
      duration: 0.5 * 60 * 1000, // Duração em milissegundos (1 minuto)
      content: (
        <img
          src="/img/campanha.gif"
          alt="GIF"
          style={{ width: '100%', height: 'auto' }}
        />
      ),
    },
    // Adicione mais telas aqui da mesma forma
  ];

  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  useEffect(() => {
    const nextScreenIndex =
      currentScreenIndex === screens.length - 1 ? 0 : currentScreenIndex + 1;
    const screenInterval = setInterval(() => {
      setCurrentScreenIndex(nextScreenIndex);
    }, screens[currentScreenIndex].duration);

    return () => {
      clearInterval(screenInterval);
    };
  }, [currentScreenIndex]);

  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <Box mb="20px" className={`fade-transition fade-in`}>
          {screens[currentScreenIndex].content}
        </Box>
        <br />
      </Box>
      <CustomToastWithConfetti />
    </AdminLayout>
  );
}
