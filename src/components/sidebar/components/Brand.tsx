// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components

import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<img
  style={{ height: "80px", width: "235px" }}
  src="https://images.tcdn.com.br/files/1134796/themes/17/img/settings/WorldSegLogo.png"
  alt="Descrição da imagem"
/>

			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
