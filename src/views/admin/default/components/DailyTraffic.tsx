import React, { useState, useEffect } from 'react';
import { Box, Flex, Icon, Text, useColorModeValue, Badge,Skeleton, SkeletonCircle, Spacer } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { VSeparator } from 'components/separator/Separator';
import { RiArrowUpSFill } from 'react-icons/ri';
import { fetchAndFormatDataGeral, getTokenGeral } from 'api/requests/Fatur_diarioGeral'; 
import StatusIndicator from './StatusIndicator';
import { Grafico } from './Grafico';

interface Props {
  percentualdiaUdi: number;
  percentualdiaGyn: number;
  metaUdi: number;
  metaGyn: number;
  diasFaltantes: number;
  isLoadingData: boolean;
}


export default function DailyTraffic({isLoadingData, diasFaltantes, percentualdiaUdi, percentualdiaGyn, metaUdi, metaGyn, ... rest }:Props) {
  
  
  const [formattedValue1, setFormattedValue1] = useState<number | null>(null);
  const [formattedValue2, setFormattedValue2] = useState<number | null> (null);
  const textColor = useColorModeValue('secondaryGray.900', 'white');



  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getTokenGeral();
        if (token !== null) {
          const response = await fetchAndFormatDataGeral(token);
          if (response !== null) {
            const { gynSFormatGeral, udiSFormatGeral, } = response;

            setFormattedValue1(udiSFormatGeral);  
            setFormattedValue2(gynSFormatGeral);
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
      <Flex justify='start' align='center'>
      <Badge mr='2' fontSize='0.8em' colorScheme='purple'>
          Falta {diasFaltantes} dia
        </Badge>

        <StatusIndicator />
        </Flex>
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
              {formattedValue1 !== null ? formattedValue1.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Carregando...'}
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
              {formattedValue2 !== null ? formattedValue2.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Carregando...'}
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
      <Flex justify='center' align='center' w='100%' mt='20px'>
        <Grafico metaUdi = {metaUdi} metaGyn = {metaGyn} />
        </Flex>
    </Card>
  );
}
