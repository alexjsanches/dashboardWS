// Chakra Imports
import { Button, Icon, useColorMode } from '@chakra-ui/react'
// Custom Icons
import { IoMdMoon, IoMdSunny } from 'react-icons/io'
import React, { useEffect, useState } from 'react' // Adicionei useState
import { isWindowAvailable } from 'utils/navigation'

export default function FixedPlugin(props: { [x: string]: any }) {
  const { ...rest } = props
  const { colorMode, toggleColorMode } = useColorMode()
  const [left, setLeft] = useState('') // Use useState para armazenar left
  const [right, setRight] = useState('35px') // Use useState para armazenar right
  let bgButton = 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'

  useEffect(() => {
    if (isWindowAvailable() || window.document.documentElement.dir !== 'rtl') {
      setLeft('') // Atualiza o valor de left
      setRight('35px') // Atualiza o valor de right
    } else {
      setLeft('35px') // Atualiza o valor de left
      setRight('') // Atualiza o valor de right
    }
  }, [])

  return (
    <Button
      {...rest}
      h='60px'
      w='60px'
      bg={bgButton}
      zIndex='99'
      position='fixed'
      variant='no-effects'
      left={left}
      right={right}
      bottom='30px'
      border='1px solid'
      borderColor='#6A53FF'
      borderRadius='50px'
      onClick={toggleColorMode}
      display='flex'
      p='0px'
      alignItems='center'
      justifyContent='center'
    >
      <Icon
        h='24px'
        w='24px'
        color='white'
        as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
      />
    </Button>
  )
}
