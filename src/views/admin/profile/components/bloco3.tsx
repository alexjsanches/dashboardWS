import {
    Box,
    Spacer,
    Badge,
    Flex,
    Text,
    Skeleton
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import {MetaUdi} from 'views/admin/default/components/MetaUdi_dia';
import {MetaGyn} from 'views/admin/default/components/MetaGyn_dia';

interface Props {
    udiSFormatHj : number;
    isLoadingData : boolean;
    gynSFormatHj : number;
    metaDiariaCalcUDI : number;
    metaDiariaCalcGYN : number;
}

export default function Bloco3({udiSFormatHj, isLoadingData, gynSFormatHj, metaDiariaCalcUDI, metaDiariaCalcGYN} : Props) {

    // @ts-ignore
    return (

        <Flex minWidth='max-content' alignItems='center' gap='8'>
            <Card flexDirection='column' w='100%' ml='5'>
                <Flex alignItems='left'>
                    <Box p='2'>
                        <Text color='secondaryGray.600' fontSize='lg' fontWeight='500'>
                            UDI - Fatur. do Dia
                        </Text>
                    </Box>
                    <Spacer/>
                    <Box p='2'>
                        <Badge ml='45px' fontSize='0.8em' colorScheme='yellow'>
                            {metaDiariaCalcUDI !== null
                                ? "Meta do dia: " + metaDiariaCalcUDI.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })
                                : "Carregando"}
                        </Badge>
                    </Box>
                </Flex>
                <Flex direction='row' mb='5px' align='center' justify='center' pt='5px'>

                    {isLoadingData
                        ? (<Skeleton height="20px" width="250px"/>)
                        : (
                            <Text color='green.500' fontSize='35px' fontWeight='700' lineHeight='100%'>
                                {udiSFormatHj !== null && udiSFormatHj !== undefined
                                    ? udiSFormatHj.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })
                                    : udiSFormatHj === undefined
                                        ? "R$ 0,00"
                                        : "Carregando"
}

                            </Text>
                        )}

                    {isLoadingData
                        ? (
                            <Flex flexDirection='row' gap='2' alignItems='center'></Flex>
                        )
                        : (<MetaUdi udiSFormatHj={udiSFormatHj} metaDiariaCalcUDI={metaDiariaCalcUDI}/>)}

                </Flex>

            </Card>
            <Card flexDirection='column' w='100%' mr='5'>
                <Flex alignItems='left'>
                    <Box p='2'>
                        <Text color='secondaryGray.600' fontSize='lg' fontWeight='500'>
                            GYN - Fatur. do dia
                        </Text>
                    </Box>
                    <Spacer/>
                    <Box p='2'>
                        <Badge ml='45px' fontSize='0.8em' colorScheme='blue'>
                            {metaDiariaCalcGYN !== null
                                ? "Meta do dia: " + metaDiariaCalcGYN.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })
                                : "Carregando"}
                        </Badge>
                    </Box>
                </Flex>
                <Flex direction='row' mb='10px' align='center' justify='center' pt='5px'>

                    {isLoadingData
                        ? (<Skeleton height="20px" width="250px"/>)
                        : (
                            <Text color='green.500' fontSize='35px' fontWeight='700' lineHeight='100%'>
                                {gynSFormatHj !== null && gynSFormatHj !== undefined
                                    ? gynSFormatHj.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })
                                    : gynSFormatHj === undefined
                                        ? "R$ 0,00"
                                        : "Carregando"
}
                            </Text>
                        )}
                    {isLoadingData
                        ? (
                            <Flex flexDirection='row' gap='2' alignItems='center'></Flex>
                        )
                        : (<MetaGyn gynSFormatHj={gynSFormatHj} metaDiariaCalcGYN={metaDiariaCalcGYN}/>)}
                </Flex>

            </Card>
        </Flex>

    )
}
