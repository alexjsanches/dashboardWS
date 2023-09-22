import { Box, Spacer, Badge, Flex, Text, Skeleton } from '@chakra-ui/react';
import Card from 'components/card/Card';

export default function Bloco2({ diasFaltantes, isLoadingData, metaGyn, metaDiariaCalcGYN, tendenciaGYN}) {

 
  return (
    <div>
      
      <Card alignItems='left'flexDirection='column' w='100%'>
      <Flex>
        <Box p='2' >
  <Text color='secondaryGray.600' fontSize='lg' fontWeight='500'>
            GYN - Meta Global
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
            GYN - Meta do dia
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
                {metaDiariaCalcGYN.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Text>
            )}
          </Flex>

        </Flex>
      
      </Card>
      <Card mt='15px' alignItems='left'flexDirection='column' w='100%'>
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
            <Text color='red.500' fontSize='35px' fontWeight='700' lineHeight='100%'>
            {tendenciaGYN.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}   
            </Text>
            )}
          </Flex>

        </Flex>
      
      </Card>
          </div>
  )
}


