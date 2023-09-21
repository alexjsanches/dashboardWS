import { Box, Spacer, Badge, Flex, Text, Skeleton } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Card from 'components/card/Card';
import { fetchAndFormatData, getToken } from 'api/requests/sankhyaw';

export default function Bloco1() {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [udiSFormat, setUdiSFormat] = useState<number | null>(null);
  const metaUdi = 3129282.73; 
  const diasUteisNoMes = 20;
  const diasConcluidos = 13;
  const diasFaltantes = diasUteisNoMes - diasConcluidos;
  const tendencia = (udiSFormat / diasConcluidos) * diasUteisNoMes; 

  const metaDiaria = udiSFormat !== 0 ? (metaUdi - udiSFormat) / diasFaltantes : 0;

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getToken();
        if (token !== null) {
          const response = await fetchAndFormatData(token);
          if (response !== null) {
            const { udiSFormat } = response;
            setUdiSFormat(udiSFormat);
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

    const intervalId = setInterval(fetchData, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  
 
  return (
    <div>
      
      <Card alignItems='left'flexDirection='column' w='100%'>
      <Flex>
        <Box p='2' >
  <Text color='secondaryGray.600' fontSize='lg' fontWeight='500'>
            UDI - Meta Global
          </Text>
          </Box>
  <Spacer />
 <Box p='2'>
  <Badge ml='45px' fontSize='0.8em' colorScheme='yellow'>
          Faltam {diasFaltantes} dias
        </Badge>
        </Box>
</Flex>
        <Flex
          direction='column'
          mb='18px'
          align='start'
          justify='center'
          px='15px'
          pt='5px'
        >
        

      
      <Flex align='left' mt='15px'>
      {isLoadingData ? (
              <Skeleton height="20px" width="250px" />
            ) : (
            <Text color='gray.700' fontSize='35px' fontWeight='700' lineHeight='100%'>
            {metaUdi.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 

            </Text>
            )}
          </Flex>

        </Flex>
      
      </Card>
      <Card mt='15px' alignItems='left'flexDirection='column' w='100%'>
      <Flex>
        <Box p='2' >
  <Text color='secondaryGray.600' fontSize='lg' fontWeight='500'>
            UDI - Meta do dia
          </Text>
          </Box>
  <Spacer />
 <Box p='2'>
  <Badge ml='45px' fontSize='0.8em' colorScheme='blue'>
          % maior
        </Badge>
        </Box>
</Flex>
        <Flex
          direction='column'
          mb='18px'
          align='start'
          justify='center'
          px='15px'
          pt='5px'
        >
        

      
      <Flex align='left' mt='15px'>
      {isLoadingData ? (
              <Skeleton height="20px" width="250px" />
            ) : (
            <Text color='gray.700' fontSize='35px' fontWeight='700' lineHeight='100%'>
            {metaDiaria.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
            </Text>
            )}
          </Flex>

        </Flex>
      
      </Card>
      <Card mt='15px' alignItems='left'flexDirection='column' w='100%'>
      <Flex>
        <Box p='2' >
  <Text color='secondaryGray.600' fontSize='lg' fontWeight='500'>
            UDI - Tendência
          </Text>
          </Box>
  <Spacer />
 <Box p='2'>
  <Badge fontSize='0.8em' colorScheme='red'>
          Abaixo da Meta
        </Badge>
        </Box>
</Flex>
        <Flex
          direction='column'
          mb='18px'
          align='start'
          justify='center'
          px='15px'
          pt='5px'
        >
        

      
      <Flex align='left' mt='15px'>
      {isLoadingData ? (
              <Skeleton height="20px" width="250px" />
            ) : (
            <Text color='red.500' fontSize='35px' fontWeight='700' lineHeight='100%'>
            {tendencia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}   
            </Text>
            )}
          </Flex>

        </Flex>
      
      </Card>
          </div>
  )
}


