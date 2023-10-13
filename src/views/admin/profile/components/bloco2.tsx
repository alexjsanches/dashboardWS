import { Box, Spacer, Badge, Flex, Text, Skeleton, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
interface Props {
  diasFaltantes: number;
  isLoadingData: boolean;
  metaGyn: number;
  metaDiariaCalcGYN: number;
  tendenciaGYN: number;
}

export default function Bloco2({ diasFaltantes, isLoadingData, metaGyn, metaDiariaCalcGYN, tendenciaGYN}: Props) {

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textcolorRed = useColorModeValue('red.500', 'red.400'); 

 
  return (
    <div>
      
      <Card alignItems='left'flexDirection='column' w='100%'>
      <Flex>
        <Box p='2' >
  <Text color='secondaryGray.600' fontSize='lg' fontWeight='500'>
            Meta Global
          </Text>
          </Box>
  <Spacer />
 <Box p='2'>
  <Badge ml='45px' fontSize='0.8em' colorScheme='yellow'>
  GYN
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
            {metaGyn.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
            </Text>
            )}
          </Flex>

        </Flex>
      
      </Card>
      <Card mt='15px' alignItems='left'flexDirection='column' w='100%'>
      <Flex>
        <Box p='2' >
  <Text color='secondaryGray.600' fontSize='lg' fontWeight='500'>
            Meta do dia
          </Text>
          </Box>
  <Spacer />
 <Box p='2'>
  <Badge ml='45px' fontSize='0.8em' colorScheme='blue'>
          GYN
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
                {metaDiariaCalcGYN.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Text>
            )}
          </Flex>

        </Flex>
      
      </Card>
      <Card mt='15px' alignItems='left'flexDirection='column' w='100%' hidden>
      <Flex>
        <Box p='2' >
  <Text color='secondaryGray.600' fontSize='lg' fontWeight='500'>
            GYN - Tendência
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
            {tendenciaGYN.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}   
            </Text>
            )}
          </Flex>

        </Flex>
      
      </Card>
          </div>
  )
}


