import {
    Box,
    Spacer,
    Badge,
    Flex,
    Text,
    Skeleton, useColorModeValue
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import {Margem} from 'views/admin/default/components/Margem';

interface Props {
    percMargem: { [codVend: string]: number } | null;
    isLoadingData: boolean;
  }
  


export default function Bloco4({percMargem, isLoadingData} : Props) {
    const textColor = useColorModeValue('green.500', 'green.300');
    return (

        <Flex minWidth='max-content' alignItems='center' gap='8'>
            <Card flexDirection='column' w='100%' ml='5'>
                <Flex alignItems='left'>
                    <Box p='2'>
                        <Text color='secondaryGray.600' fontSize='lg' fontWeight='500'>
                            Margem de Contribuição Percentual
                        </Text>
                    </Box>
                    <Spacer/>
                    <Box p='2'>
                        <Badge ml='45px' fontSize='0.8em' colorScheme='yellow'>
                            Por Vendedor
                        </Badge>
                    </Box>
                </Flex>
                <Flex direction='row' mb='5px' align='center' justify='center' pt='5px'>


                <Margem percMargem={percMargem} />
  



                </Flex>

            </Card>
        </Flex>

    )
}
