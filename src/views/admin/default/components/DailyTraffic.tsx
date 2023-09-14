import React, { useState, useEffect } from 'react';
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import PieChart from 'components/charts/PieChart';
import { pieChartData, pieChartOptions } from 'variables/charts';
import Card from 'components/card/Card';
import { VSeparator } from 'components/separator/Separator';
import { RiArrowUpSFill } from 'react-icons/ri';
import { fetchAndFormatData } from 'api/sankhyaw';

export default function DailyTraffic({ ...rest }) {
  const [formattedValues, setFormattedValues] = useState<string | null>(null);
  const [secondFormattedValue, setSecondFormattedValue] = useState<string | null>(null);
  const [percentageValue1, setPercentageValue1] = useState<number | null>(null);
  const [percentageValue2, setPercentageValue2] = useState<number | null>(null);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
	const cardColor = useColorModeValue('white', 'navy.700');
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchAndFormatData();
        console.log(fetchAndFormatData())
        if (response !== null) {
          const [value1, value2] = response.split(',').map(parseFloat);
          // Calcula o total
          const total = value1 + value2;

          // Calcula os percentuais
          const percentValue1 = (value1 / total) * 100;
          const percentValue2 = (value2 / total) * 100;

          // Formate os valores para moeda e os percentuais
          const formattedValue1 = value1.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          const formattedValue2 = value2.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

          setFormattedValues(formattedValue1);
          setSecondFormattedValue(formattedValue2);
          setPercentageValue1(percentValue1);
          setPercentageValue2(percentValue2);

          
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        // Lidar com erros de forma adequada, como mostrar uma mensagem de erro para o usuário
      }
    }
    // Chama a função fetchData quando o componente é montado
    fetchData();

    // Define um intervalo para atualizar os dados a cada 10 segundos
    const intervalId = setInterval(fetchData, 10000);

    // Limpa o intervalo quando o componente é desmontado
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Card alignItems='start' flexDirection='column' w='100%' {...rest}>
      <Flex justify='space-between' align='start'  pt='5px' w='100%'>
        <Flex flexDirection='column' align='start'>
          <Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
            Faturamento UDI
          </Text>
          <Flex align='end'>
          <Text color={textColor} fontSize='30px' fontWeight='700' lineHeight='100%'>
              {formattedValues !== null ? formattedValues : 'Carregando...'}
            </Text>
          </Flex>
        </Flex>
        <Flex align='center' mt='4px'>
          <Icon as={RiArrowUpSFill} color='green.500' />
          <Text color='green.500' fontSize='sm' fontWeight='700'>
          {percentageValue1 !== null ? `${percentageValue1.toFixed(2)}%` : 'Carregando...'}
          </Text>
        </Flex>
      </Flex>
      <Flex justify='space-between' align='start' pt='5px' w='100%' mt='25px'>
        <Flex flexDirection='column' align='start'>
          <Text color='secondaryGray.600' fontSize='sm' fontWeight='500'>
            Faturamento GYN
          </Text>
          <Flex align='end'>
          <Text color={textColor} fontSize='30px' fontWeight='700' lineHeight='100%'>
              {secondFormattedValue !== null ? secondFormattedValue : 'Carregando...'}
            </Text>
          </Flex>
        </Flex>
        <Flex align='center' mt='4px'>
          <Icon as={RiArrowUpSFill} color='green.500' />
          <Text color='green.500' fontSize='sm' fontWeight='700'>
          {percentageValue2 !== null ? `${percentageValue2.toFixed(2)}%` : 'Carregando...'}
          </Text>
        </Flex>
      </Flex>
      <Box h='240px' mt='25px'>
      <PieChart h='100%' w='100%' chartData={pieChartData} chartOptions={pieChartOptions} />
			<Card
				bg={cardColor}
				flexDirection='row'
				boxShadow={cardShadow}
				w='100%'
				p='15px'
				px='20px'
				mt='15px'
				mx='auto'>
				<Flex direction='column' py='5px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							Goiânia
						</Text>
					</Flex>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						63%
					</Text>
				</Flex>
				<VSeparator mx={{ base: '60px', xl: '60px', '2xl': '60px' }} />
				<Flex direction='column' py='5px' me='10px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							Uberlândia
						</Text>
					</Flex>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						25%
					</Text>
				</Flex>
			</Card>
      </Box>
    </Card>
  );
}
