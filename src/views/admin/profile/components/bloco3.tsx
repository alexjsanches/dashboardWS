import {
    Box,
    Spacer,
    Badge,
    Flex,
    Text,
    Skeleton,
    Grid
} from '@chakra-ui/react';
import {useState, useEffect} from 'react';
import Card from 'components/card/Card';
import {fetchAndFormatData, getToken} from 'api/requests/Und_FaturDiario';
import {MetaUdi} from 'views/admin/default/components/MetaUdi_dia';
import {MetaGyn} from 'views/admin/default/components/MetaGyn_dia';

export default function Bloco3() {
    const [isLoadingData,
        setIsLoadingData] = useState(true);
    const [udiSFormat,
        setUdiSFormat] = useState < number | null > (null);
    const [gynSFormat,
        setGynSFormat] = useState < number | null > (null);
    const metaUdi = 156464.14;
    const metaGyn = 191233.94;
    const metaPercent = udiSFormat !== 0
        ? ((udiSFormat / metaUdi) - 1) * -100
        : 0;
    const metaPercentGyn = gynSFormat !== 0
        ? ((gynSFormat / metaGyn) - 1) * -100
        : 0;

    useEffect(() => {
        async function fetchData() {
            try {
                const token = await getToken();
                if (token !== null) {
                    const response = await fetchAndFormatData(token);
                    if (response !== null) {
                        const {udiSFormat, gynSFormat} = response;
                        setUdiSFormat(udiSFormat);
                        setGynSFormat(gynSFormat);
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
// @ts-ignore
    return (

        <Flex minWidth='max-content' alignItems='center' gap='8'>
            <Card flexDirection='column' w='100%' ml='5'>
                <Flex alignItems='left'>
                    <Box p='2'>
                        <Text color='secondaryGray.600' fontSize='lg' fontWeight='500'>
                           UDI - Fatur. do Dia Anterior 
                        </Text>
                    </Box>
                    <Spacer/>
                    <Box p='2'>
                        <Badge ml='45px' fontSize='0.8em' colorScheme='yellow'>
                            {metaPercent.toFixed(2)}
                            % abaixo da meta
                        </Badge>
                    </Box>
                </Flex>
                <Flex
                    direction='row'
                    mb='5px'
                    align='center'
                    justify='center'
                    pt='5px'>

                    
                        {isLoadingData
                            ? (<Skeleton height="20px" width="250px"/>)
                            : (
                                <Text color='green.500' fontSize='35px' fontWeight='700' lineHeight='100%'>
                                    {udiSFormat.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })}
                                </Text>
                            )}

                        {isLoadingData
                            ? (
                                <Flex flexDirection='row' gap='2' alignItems='center'>

                                </Flex>
                            )
                            : (<MetaUdi/>)}
                   

                </Flex>

            </Card>
            <Card  flexDirection='column' w='100%' mr='5'>
                <Flex alignItems='left'>
                    <Box p='2'>
                        <Text color='secondaryGray.600' fontSize='lg' fontWeight='500'>
                           GYN - Fatur. do dia Anterior
                        </Text>
                    </Box>
                    <Spacer/>
                    <Box p='2'>
                        <Badge ml='45px' fontSize='0.8em' colorScheme='blue'>
                            {metaPercentGyn.toFixed(2)}
                            % abaixo da meta
                        </Badge>
                    </Box>
                </Flex>
                <Flex
                    direction='row'
                    mb='10px'
                    align='center'
                    justify='center'
                    pt='5px'>
                        
                        {isLoadingData
                            ? (<Skeleton height="20px" width="250px"/>)
                            : (
                                <Text color='green.500' fontSize='35px' fontWeight='700' lineHeight='100%'>
                                    {gynSFormat.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })}
                                </Text>
                            )}
                        {isLoadingData
                            ? (
                                <Flex flexDirection='row' gap='2' alignItems='center'>
                                    
                                </Flex>
                            )
                            : (<MetaGyn/>)}
                </Flex>

            </Card>
        </Flex>

    )
}
