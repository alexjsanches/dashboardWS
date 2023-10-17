import React, { useState, useEffect } from 'react';
import { Box, Flex, Icon, Text, useColorModeValue, Badge,Skeleton, SkeletonCircle } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { VSeparator } from 'components/separator/Separator';
import { RiArrowUpSFill } from 'react-icons/ri';
import { fetchAndFormatData, getToken } from 'api/requests/Fatur_diarioGeral'; 
import StatusIndicator from './StatusIndicator';
import { Grafico } from './Grafico';

interface Props {
  percentualdiaUdi: number;
  percentualdiaGyn: number;
  metaUdi: number;
  metaGyn: number;
  diasFaltantes: number;
}


export default function DailyTraffic({ diasFaltantes, percentualdiaUdi, percentualdiaGyn, metaUdi, metaGyn, ... rest }:Props) {
  
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [formattedValue1, setFormattedValue1] = useState<string | null>('Carregando...');
  const [formattedValue2, setFormattedValue2] = useState<string | null>('Carregando...');
  const textColor = useColorModeValue('secondaryGray.900', 'white');



  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getToken();
        if (token !== null) {
          const response = await fetchAndFormatData(token);
          if (response !== null) {
            const { formattedValue1, formattedValue2, } = response;

            setFormattedValue1(formattedValue1);  
            setFormattedValue2(formattedValue2);
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
          Faltam {diasFaltantes} dias
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
            {percentualdiaUdi !== null ? `${percentualdiaUdi.toFixed(2)} %` : 'Carregando...'}
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
            {percentualdiaGyn !== null ? `${percentualdiaGyn.toFixed(2)} %` : 'Carregando...'}
          </Text>
            )}
        </Flex>
      </Flex>
      <Box h='240px' mt='25px'>
        <Grafico metaUdi = {metaUdi}
            metaGyn = {metaGyn} />
      </Box>
    </Card>
  );
}
