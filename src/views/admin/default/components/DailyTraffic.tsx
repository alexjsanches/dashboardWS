import React, { useState, useEffect } from 'react';
import { Box, Flex, Icon, Text, useColorModeValue, Badge,Skeleton, SkeletonCircle } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { VSeparator } from 'components/separator/Separator';
import { RiArrowUpSFill } from 'react-icons/ri';
import { fetchAndFormatData, getToken } from 'api/requests/Fatur_diarioGeral'; 
import { Grafico } from './Grafico';
import StatusIndicator from './StatusIndicator';




export default function DailyTraffic({ ...rest }) {
  const getYesterdayFormatted = () => {
    const months = [
      'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
      'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'
    ];
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate());
  
    const day = yesterday.getDate().toString().padStart(2, '0');
    const monthIndex = yesterday.getMonth();
    const month = months[monthIndex];
    
    return `${day}-${month}`;
  };
  
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [formattedValue1, setFormattedValue1] = useState<string | null>('Carregando...');
  const [formattedValue2, setFormattedValue2] = useState<string | null>('Carregando...');
  const [percentageValue1, setPercentageValue1] = useState<number | null>(50);
  const [percentageValue2, setPercentageValue2] = useState<number | null>(50);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardColor = useColorModeValue('white', 'navy.700');
  const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');



  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getToken();
        if (token !== null) {
          const response = await fetchAndFormatData(token);
          if (response !== null) {
            const { formattedValue1, formattedValue2, percentValue1, percentValue2 } = response;

            setFormattedValue1(formattedValue1);
            setFormattedValue2(formattedValue2);
            setPercentageValue1(percentValue1);
            setPercentageValue2(percentValue2);
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

  return (
    <Card alignItems='start' flexDirection='column' w='100%' {...rest}>
      <Flex justify='space-between' align='start' pt='5px' w='100%'>
      <Text fontSize='lg' fontWeight='bold'>
        Por Unidade
      </Text>
      <Badge ml='10' fontSize='0.8em' colorScheme='purple'>
          Dados ao vivo
        </Badge>
        <StatusIndicator />
      </Flex>
      <Flex justify='space-between' align='start' pt='5px' w='100%'>
        <Flex flexDirection='column' align='start'>
          <Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
            Faturamento UDI
          </Text>
          <Flex align='end'>
          {isLoadingData ? (
              <Skeleton height="20px" width="250px" />
            ) : (
            <Text color={textColor} fontSize='30px' fontWeight='700' lineHeight='100%'>
              {formattedValue1 !== null ? formattedValue1 : 'Carregando...'}
            </Text>
            )}
          </Flex>
        </Flex>
        <Flex align='center' mt='4px'>
          <Icon as={RiArrowUpSFill} color='green.500' />
          {isLoadingData ? (
              <Skeleton height="20px" width="50px" />
            ) : (
          <Text color='green.500' fontSize='sm' fontWeight='700'>
            {percentageValue1 !== null ? `${percentageValue1.toFixed(2)}%` : 'Carregando...'}
          </Text>
            )}
        </Flex>
      </Flex>
      <Flex justify='space-between' align='start' pt='5px' w='100%' mt='25px'>
        <Flex flexDirection='column' align='start'>
          <Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
            Faturamento GYN
          </Text>
          <Flex align='end'>
            {isLoadingData ? (
              <Skeleton height="20px" width="250px" />
            ) : (
            <Text color={textColor} fontSize='30px' fontWeight='700' lineHeight='100%'>
              {formattedValue2 !== null ? formattedValue2 : 'Carregando...'}
            </Text>
            )}
          </Flex>
        </Flex>
        <Flex align='center' mt='4px'>
          <Icon as={RiArrowUpSFill} color='green.500' />
          {isLoadingData ? (
              <Skeleton height="20px" width="50px" />
            ) : (
          <Text color='green.500' fontSize='sm' fontWeight='700'>
            {percentageValue2 !== null ? `${percentageValue2.toFixed(2)}%` : 'Carregando...'}
          </Text>
            )}
        </Flex>
      </Flex>
      <Box h='240px' mt='25px'>
      {isLoadingData ? (
              <SkeletonCircle size='40'/>
            ) : (
        <Grafico />
            )}
        <Card
          bg={cardColor}
          flexDirection='row'
          boxShadow={cardShadow}
          w='100%'
          p='15px'
          px='20px'
          mx='auto'>
          <Flex direction='column' py='5px'>
            <Flex align='center'>
              <Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
              <Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
                Uberlândia
              </Text>
            </Flex>
            {isLoadingData ? (
              <Skeleton height="20px" width="50px" />
            ) : (
            <Text fontSize='lg' color={textColor} fontWeight='700'>
              {percentageValue1 !== null ? `${percentageValue1.toFixed(2)}%` : 'Carregando...'}
            </Text>
            )}
          </Flex>
          <VSeparator mx={{ base: '60px', xl: '60px', '2xl': '60px' }} />
          <Flex direction='column' py='5px' me='10px'>
            <Flex align='center'>
              <Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
              <Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
                Goiânia
              </Text>
            </Flex>
            {isLoadingData ? (
              <Skeleton height="20px" width="50px" />
            ) : (
            <Text fontSize='lg' color={textColor} fontWeight='700'>
              {percentageValue2 !== null ? `${percentageValue2.toFixed(2)}%` : 'Carregando...'}
            </Text>
            )}
          </Flex>
        </Card>
      </Box>
    </Card>
  );
}
