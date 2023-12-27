import { Button, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { Image } from 'components/image/Image'
import logoWhite from 'img/layout/logoWhite.png'
import { useState, useEffect } from 'react'
import DailyTraffic from 'views/admin/default/components/DailyTraffic'

export default function SidebarDocs() {
  const bgColor = 'linear-gradient(135deg, #21a357 10.42%, #97c21e 39.06%, #0ea8e3 70.83%, #1279be 100%)'
  const borderColor = useColorModeValue('white', 'navy.800')

  const meses = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];

  const [dataAtual, setDataAtual] = useState(new Date());

  useEffect(() => {
    // Atualiza a data a cada minuto
    const intervalId = setInterval(() => {
      setDataAtual(new Date());
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const mes = meses[dataAtual.getMonth()]; // Obtém o mês em formato abreviado
  const dataFormatada = `${dataAtual.getDate()} ${mes.toUpperCase()} ${dataAtual.getFullYear()}`;
  const hora = dataAtual.getHours().toString().padStart(2, "0");
  const minutos = dataAtual.getMinutes().toString().padStart(2, "0");

  return (
    <div>
      <Flex
        justify='center'
        direction='column'
        align='center'
        bg={bgColor}
        borderRadius='30px'
        me='20px'
        position='relative'
      >
         <iframe
        src="https://www.instagram.com/p/C1QlRijNDJe/embed"
        width="100%"
        height="400px"
        scrolling="no"
        
      ></iframe>
        
      </Flex>
      <br></br>
      <Flex
        justify='center'
        direction='column'
        align='center'
        bg={bgColor}
        borderRadius='30px'
        me='20px'
        position='relative'
      >
        <Flex
          direction='column'
          mb='12px'
          align='center'
          justify='center'
          px='15px'
          pt='55px'
        >
          <Text
            fontSize={{ base: 'lg', xl: '50px' }}
            color='white'
            fontWeight='bold'
            lineHeight='150%'
            textAlign='center'
            px='10px'
            mb='14px'
          >
            {dataFormatada}
          </Text>

        </Flex>
        <Button
          bg='whiteAlpha.300'
          _hover={{ bg: 'whiteAlpha.200' }}
          _active={{ bg: 'whiteAlpha.100' }}
          mb={{ sm: '16px', xl: '24px' }}
          color={'white'}
          fontWeight='regular'
          fontSize='30px'
          minW='185px'
          mx='auto'
        >
          {hora} : {minutos}
        </Button>
      </Flex>
    </div>
  )
}


