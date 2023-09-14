import React, { useState } from 'react';
import { Box, Flex, Icon, Progress, Text, useColorModeValue, Input, Button } from '@chakra-ui/react';
import Card from 'components/card/Card';
import IconBox from 'components/icons/IconBox';
import Menu from 'components/menu/MainMenu';
import { MdOutlineCloudDone } from 'react-icons/md';
import { updatePayloadReq } from 'api/payloads/GOL';

export default function Banner(props: { used: number; total: number; [x: string]: any }) {
	const { used, total } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const textColorSecondary = 'gray.400';
	const box = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  	const [startDate, setStartDate] = useState("2023-09-01");
  	const [endDate, setEndDate] = useState("2023-09-01");

  function formatDateToDDMMYYYY(date: string): string {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  const updatePayload = () => {
    const formattedStartDate = formatDateToDDMMYYYY(startDate);
    const formattedEndDate = formatDateToDDMMYYYY(endDate);
    const updatedPayload = `
      <serviceRequest serviceName="VendasGOLSP.getVendasFaturamento">
        <requestBody>
          <vendas PERIODO.INI="${formattedStartDate}" PERIODO.FIN="${formattedEndDate}" TIPO="VENDEDOR" _id="-50" CONFIG_CONSOLIDACAO="5" EMPRESA="999,4,2,3,1,100" GERENTESUBORDINADO="false" TIPO_AGRUPAMENTO="G"/>
          <clientEventList/>
        </requestBody>
      </serviceRequest>
    `;
    updatePayloadReq(updatedPayload); // Chame a função de atualização no arquivo GOL.ts
  };

  return (
    <Card mb={{ base: '0px', lg: '20px' }} alignItems='center'>
      <Flex w='100%'>
        <Menu ms='auto' />
      </Flex>
      <IconBox
        mx='auto'
        h='100px'
        w='100px'
        icon={<Icon as={MdOutlineCloudDone} color={brandColor} h='46px' w='46px' />}
        bg={box}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>
        Data início
      </Text>
      <Input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
      <Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>
        Data Fim
      </Text>
      <Input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <Box w='100%' mt='auto'>
        <Flex w='100%' justify='space-between' mb='10px'>
          <Button onClick={updatePayload}>Atualizar Payload</Button>
        </Flex>
        <Progress alignItems='start' colorScheme='brandScheme' value={used / total * 100} w='100%' />
      </Box>
    </Card>
  );
}
