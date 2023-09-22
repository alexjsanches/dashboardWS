import React, {useState, useEffect} from 'react';
import {Box, Grid} from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';
import Bloco1 from 'views/admin/profile/components/bloco1';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import Bloco2 from 'views/admin/profile/components/bloco2';
import CustomToastWithConfetti from 'views/admin/profile/components/confetti';
import 'styles/Fade.module.css';
import Bloco3 from 'views/admin/profile/components/bloco3';
import { fetchAndFormatData, getToken } from 'api/requests/sankhyaw';

export default function UserReports() {

    const [isLoadingData,setIsLoadingData] = useState(true);
    const [udiSFormat,setUdiSFormat] = useState < number | null > (null);
    const [gynSFormat,setGynSFormat] = useState < number | null > (null);
    const metaDiariaUdi = 156464.14;
    const metaDiariaGyn = 191233.94;
    const metaUdi = 3129282.73;
    const metaGyn = 3824678.76; 
    const diasUteisNoMes = 20;
    const diasConcluidos = 14;
    const diasFaltantes = diasUteisNoMes - diasConcluidos;
    const tendenciaUDI = (udiSFormat / diasConcluidos) * diasUteisNoMes; 
    const tendenciaGYN = (gynSFormat / diasConcluidos) * diasUteisNoMes;
    const metaDiariaCalcUDI = udiSFormat !== 0 ? (metaUdi - udiSFormat) / diasFaltantes : 0;
    const metaDiariaCalcGYN = gynSFormat !== 0 ? (metaGyn - gynSFormat) / diasFaltantes : 0;


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
  
      fetchData();
    }, []);



    const screens = [
        {
            type: 'content', // 'content' para conteúdo atual, 'gif' para GIF
            duration: 3 * 60 * 1000, // Duração em milissegundos (3 minutos)
            content: (
                <div>
                    <Grid
                        templateColumns={{
                        base: '1fr',
                        lg: '2.5fr 2.5fr 2.5fr'
                    }}
                        templateRows={{
                        base: 'repeat(3, 1fr)',
                        lg: '1fr'
                    }}
                        gap={{
                        base: '20px',
                        xl: '20px'
                    }}>
                        <DailyTraffic/>
                        <Bloco1  diasFaltantes={diasFaltantes} isLoadingData={isLoadingData} metaUdi={metaUdi} metaDiariaCalcUDI={metaDiariaCalcUDI}  tendenciaUDI={tendenciaUDI} />
                        <Bloco2  diasFaltantes={diasFaltantes} isLoadingData={isLoadingData} metaGyn={metaGyn} metaDiariaCalcGYN={metaDiariaCalcGYN} tendenciaGYN={tendenciaGYN}/>
                    </Grid>
                    <Box mt='15'>
                        <Bloco3/>
                    </Box>
                </div>
            )
        }, {
            type: 'gif',
            duration: 0.5 * 60 * 1000, // Duração em milissegundos (1 minuto)
            content: (<img
                src="/img/resultado.gif"
                alt="GIF"
                style={{
                width: '100%',
                height: 'auto'
            }}/>)
        }, {
            type: 'gif',
            duration: 0.5 * 60 * 1000, // Duração em milissegundos (1 minuto)
            content: (<img
                src="/img/campanha.gif"
                alt="GIF"
                style={{
                width: '100%',
                height: 'auto'
            }}/>)
        },
        // Adicione mais telas aqui da mesma forma
    ];

    const [currentScreenIndex,
        setCurrentScreenIndex] = useState(0);

    useEffect(() => {
        const nextScreenIndex = currentScreenIndex === screens.length - 1
            ? 0
            : currentScreenIndex + 1;
        const screenInterval = setInterval(() => {
            setCurrentScreenIndex(nextScreenIndex);
        }, screens[currentScreenIndex].duration);

        return () => {
            clearInterval(screenInterval);
        };
    }, [currentScreenIndex]);

    return (
        <AdminLayout>
            <Box
                pt={{
                base: '130px',
                md: '80px',
                xl: '80px'
            }}>
                <Box mb="20px" className={`fade-transition fade-in`}>
                    {screens[currentScreenIndex].content}
                </Box>
            </Box>
            <CustomToastWithConfetti/>

        </AdminLayout>
    );
}
