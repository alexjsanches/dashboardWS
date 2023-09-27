// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components

import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'  >
			<img
  style={{ height: "auto", width: "260px", marginTop: "15px", marginBottom: "10px" }}
  src="/img/logo.gif"
  alt="Descrição da imagem"
/>

			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
