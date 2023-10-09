import { Box, Spacer, Badge, Flex, Text, Skeleton, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';

interface Props {
  diasFaltantes: number;
  isLoadingData: boolean;
  metaUdi: number;
  metaDiariaCalcUDI: number;
  tendenciaUDI: number;
}

export default function Bloco1({diasFaltantes, isLoadingData, metaUdi, metaDiariaCalcUDI, tendenciaUDI}: Props) {

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textcolorRed = useColorModeValue('red.500', 'red.400'); 
  
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
            <Text color={textColor} fontSize='35px' fontWeight='700' lineHeight='100%'>
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
            <Text color={textColor} fontSize='35px' fontWeight='700' lineHeight='100%'>
            {metaDiariaCalcUDI.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
            </Text>
            )}
          </Flex>

        </Flex>
      
      </Card>
      <Card mt='15px' alignItems='left'flexDirection='column' w='100%' hidden>
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
            <Text color={textcolorRed} fontSize='35px' fontWeight='700' lineHeight='100%'>
            {tendenciaUDI.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}   
            </Text>
            )}
          </Flex>

        </Flex>
      
      </Card>
          </div>
  )
}


