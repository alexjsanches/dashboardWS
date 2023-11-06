// Chakra Imports
import {
	useColorMode
} from '@chakra-ui/react';

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

export default function HeaderLinks() {
	const { colorMode, toggleColorMode } = useColorMode();
	const initialColorMode = 'light';

	useEffect(() => {
		if (colorMode !== initialColorMode) {
			toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);
  
	// Chakra Color Mode
	return (
		<div></div>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};
