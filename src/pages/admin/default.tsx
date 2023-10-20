import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';
import Bloco1 from 'views/admin/profile/components/bloco1';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import Bloco2 from 'views/admin/profile/components/bloco2';
import CustomToastWithConfetti from 'views/admin/profile/components/confetti';
import 'styles/Fade.module.css';
import Bloco3 from 'views/admin/profile/components/bloco3';
import { fetchAndFormatData, getToken } from 'api/requests/sankhyaw';
import { fetchAndFormatDataHj, getTokenHj } from 'api/requests/Und_FaturDiario';
import { fetchAndFormatDataGeral, getTokenGeral } from 'api/requests/Fatur_diarioGeral'; 
import AdminNavbarLinks from 'components/navbar/NavbarLinksAdmin'


export default function UserReports() {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [udiSFormat, setUdiSFormat] = useState<number | null>(null);
  const [gynSFormat, setGynSFormat] = useState<number | null>(null);
  const [udiSFormatHj, setUdiSFormatHj] = useState<number | null>(null);
  const [gynSFormatHj, setGynSFormatHj] = useState<number | null>(null);
  const [udiSFormatGeral, setUdiSFormatGeral] = useState<number | null>(null);
  const [gynSFormatGeral, setGynSFormatGeral] = useState<number | null>(null);
  const metaUdi = 3727807.22; 
  const metaGyn = 3879962.61;
  const diasUteisNoMes = 20;
  const diasConcluidos = 13;//
  const diasFaltantes = diasUteisNoMes - diasConcluidos;
  const metaDiariaCalcUDI =
    udiSFormat !== 0 ? (metaUdi - udiSFormat) / diasFaltantes : 0;
  const metaDiariaCalcGYN =
    gynSFormat !== 0 ? (metaGyn - gynSFormat) / diasFaltantes : 0;
  const percentualdiaUdi = (udiSFormat / metaUdi) * 100;
  const percentualdiaGyn = (gynSFormat / metaGyn) * 100;
  const tendenciaUDI = ((udiSFormat) / (diasConcluidos)) * diasUteisNoMes;
  const tendenciaGYN = (((gynSFormat) / (diasConcluidos)) * diasUteisNoMes);
 

  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getToken();
        if (token !== null) {
          const response = await fetchAndFormatData(token);
          if (response !== null) {
            const { udiSFormat, gynSFormat } = response;
            setUdiSFormat(udiSFormat);
            setGynSFormat(gynSFormat);
          } else {
            console.error('Erro ao formatar os dados.');
          }
        } else {
          console.error('Não foi possível obter o token.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchDataGeral() {
      try {
        const token = await getTokenGeral();
        if (token !== null) {
          const response = await fetchAndFormatDataGeral(token);
          if (response !== null) {
            const { udiSFormatGeral, gynSFormatGeral, } = response;

            setUdiSFormatGeral(udiSFormatGeral);  
            setGynSFormatGeral(gynSFormatGeral);
            
          } else {
            console.error('Erro ao formatar os dados.');
          }
        } else {
          console.error('Não foi possível obter o token.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }

    }

    fetchDataGeral();

    
  }, []);

  useEffect(() => {
    async function fetchDataHj() {
      try {
        const token = await getTokenHj();
        if (token !== null) {
          const response = await fetchAndFormatDataHj(token);
          if (response !== null) {
            const { udiSFormatHj, gynSFormatHj } = response;
            setUdiSFormatHj(udiSFormatHj);
            setGynSFormatHj(gynSFormatHj);
            setIsLoadingData(false);
          } else {
            console.error('Erro ao formatar os dados.');
          }
        } else {
          console.error('Não foi possível obter o token.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }

    fetchDataHj();
    const intervalId = setInterval(fetchDataHj, 180000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleVideoEnded = () => {
    const nextScreenIndex =
      currentScreenIndex === screens.length - 1 ? 0 : currentScreenIndex + 1;
    setCurrentScreenIndex(nextScreenIndex);
  };

  

  const screens = [
    {
      type: 'content', // 'content' para conteúdo atual, 'gif' para GIF
      duration: 3 * 60 * 1000, // Duração em milissegundos (3 minutos)
      content: (
        <div>
          <Grid
            templateColumns={{
              base: '1fr',
              lg: '2.5fr 2.5fr 2.5fr',
            }}
            templateRows={{
              base: 'repeat(3, 1fr)',
              lg: '1fr',
            }}
            gap={{
              base: '20px',
              xl: '20px',
            }}
          >
            <DailyTraffic 
            percentualdiaUdi={percentualdiaUdi}
            percentualdiaGyn={percentualdiaGyn}
            metaUdi = {metaUdi}
            metaGyn = {metaGyn}
            diasFaltantes = {diasFaltantes}
            isLoadingData = {isLoadingData}/>
            
            <Bloco1
              
              isLoadingData={isLoadingData}
              metaUdi={metaUdi}
              metaDiariaCalcUDI={metaDiariaCalcUDI}
              tendenciaUDI={tendenciaUDI}
              
            />
            <Bloco2
              
              isLoadingData={isLoadingData}
              metaGyn={metaGyn}
              metaDiariaCalcGYN={metaDiariaCalcGYN}
              tendenciaGYN={tendenciaGYN}
              
            />
          </Grid>
          <Box mt='15'>
            <Bloco3
              isLoadingData={isLoadingData}
              udiSFormatHj={udiSFormatHj}
              gynSFormatHj={gynSFormatHj}
              metaDiariaCalcUDI={metaDiariaCalcUDI}
              metaDiariaCalcGYN={metaDiariaCalcGYN}
            />
          </Box>
        
        </div>
      ),
    },
    {
      type: 'video', // Altere o tipo para 'video'
      duration: 39* 1000, // Duração em milissegundos (dinâmica)
      content: (
        <video width='1280' height='720' autoPlay controls onEnded={handleVideoEnded}>
          <source src='/img/video_h.mp4' type='video/mp4' />
          Seu navegador não suporta a reprodução de vídeo.
        </video>
      ),
    },
    {
      type: 'gif',
      duration: 0.5 * 60 * 1000, // Duração em milissegundos (1 minuto)
      content: (
        <img
          src='/img/campanha.gif'
          alt='GIF'
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      ),
    },
    // Adicione mais telas aqui da mesma forma
  ];
  useEffect(() => {
    const nextScreenIndex =
      currentScreenIndex === screens.length - 1 ? 0 : currentScreenIndex + 1;
    const screenInterval = setInterval(() => {
      setCurrentScreenIndex(nextScreenIndex);
    }, screens[currentScreenIndex].duration);

    return () => {
      clearInterval(screenInterval);
    };
  }, [currentScreenIndex, screens]);

  return (
    <AdminLayout>
      <Box
        pt={{
          base: '130px',
          md: '80px',
          xl: '80px',
        }}
      >
        <Box mb='20px' className={`fade-transition fade-in`}>
          {screens[currentScreenIndex].content}
        </Box>
      </Box>
      <CustomToastWithConfetti />
      <AdminNavbarLinks secondary={false} />
    </AdminLayout>
  );
}
