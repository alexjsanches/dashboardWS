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

function getVideoDuration(videoSource: string) {
  return new Promise((resolve, reject) => {
    const videoElement = document.createElement('video');
    videoElement.src = videoSource;

    videoElement.onloadedmetadata = () => {
      resolve(Math.floor(videoElement.duration * 1000)); // Duração em milissegundos
    };

    videoElement.onerror = (error) => {
      reject(error);
    };
  });
}



export default function UserReports() {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [udiSFormat, setUdiSFormat] = useState<number | null>(null);
  const [gynSFormat, setGynSFormat] = useState<number | null>(null);
  const [udiSFormatHj, setUdiSFormatHj] = useState<number | null>(null);
  const [gynSFormatHj, setGynSFormatHj] = useState<number | null>(null);
  const [udiSFormatGeral, setUdiSFormatGeral] = useState<number | null>(null);
  const [gynSFormatGeral, setGynSFormatGeral] = useState<number | null>(null);
  const metaUdi =  3577000;  
  const metaGyn =  3723000;
  const diasUteisNoMes = 20;
  const diasConcluidos = 11;//
  const diasFaltantes = diasUteisNoMes - diasConcluidos;
  const metaDiariaCalcUDI =
    udiSFormat != 0 ? (metaUdi - udiSFormatGeral) / diasFaltantes : 0;
  const metaDiariaCalcGYN =
    gynSFormat != 0 ? (metaGyn - gynSFormatGeral) / diasFaltantes : 0;
  const percentualdiaUdi = (udiSFormat / metaUdi) * 100;
  const percentualdiaGyn = (gynSFormat / metaGyn) * 100;
  const tendenciaUDI = ((udiSFormatGeral) / (diasConcluidos)) * diasUteisNoMes;
  const tendenciaGYN = (((gynSFormatGeral) / (diasConcluidos)) * diasUteisNoMes);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
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
      type: 'content', 
      duration: 2 * 60 * 1000,
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
      type: 'video', 
      duration: 100* 1000, 
      content: (
        <video muted width='1280' height='720' autoPlay onPlay={() => setIsVideoPlaying(true)} style={{borderRadius: '20px'}} onEnded={handleVideoEnded} >
          <source src='/img/video_h.mp4' type='video/mp4' />
          Seu navegador não suporta a reprodução de vídeo.
        </video>
      ),
    },
    {
      type: 'video', 
      duration: 100* 1000, 
      content: (
        <div>
        <video muted width='1280' height='720' autoPlay  onPlay={() => setIsVideoPlaying(true)} style={{borderRadius: '20px'}} onEnded={handleVideoEnded} >
          <source src='/img/video_k.mp4' type='video/mp4' />
          Seu navegador não suporta a reprodução de vídeo.
        </video>
        </div>
      ),
    },
    {
      type: 'video', 
      duration: 100* 1000, 
      content: (
        <>
        <video muted width='1280' height='720' autoPlay  onPlay={() => setIsVideoPlaying(true)} style={{borderRadius: '20px'}} onEnded={handleVideoEnded} >
          <source src='/img/video_h.mp4' type='video/mp4' />
          Seu navegador não suporta a reprodução de vídeo.
        </video>
        </>
      ),
    },
  ];
  useEffect(() => {
    const nextScreenIndex =
      currentScreenIndex === screens.length - 1 ? 0 : currentScreenIndex + 1;
  
    if (screens[currentScreenIndex].type === 'video' && !isVideoPlaying) {
      return;
    }
  
    const screenInterval = setInterval(() => {
      setCurrentScreenIndex(nextScreenIndex);
    }, screens[currentScreenIndex].duration);
  
    return () => {
      clearInterval(screenInterval);
    };
  }, [currentScreenIndex, screens, isVideoPlaying]);
  

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
