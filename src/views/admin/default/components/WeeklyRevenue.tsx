// Chakra imports IFRAME DATA STUDIO
import {
  useColorModeValue
} from '@chakra-ui/react'
import Card from 'components/card/Card'
import React from 'react'




export default function WeeklyRevenue (props: { [x: string]: any }) {
  const { ...rest } = props

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const iconColor = useColorModeValue('brand.500', 'white')
  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')
  const bgHover = useColorModeValue(
    { bg: 'secondaryGray.400' },
    { bg: 'whiteAlpha.50' }
  )
  const bgFocus = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.100' }
  )
  return (
    <Card w='800' h='470' {...rest}>
      <iframe width="795" height="429" src="https://lookerstudio.google.com/embed/reporting/9edc8d6d-9e37-4026-957f-d3ca84e9294c/page/cvQcD" allowFullScreen  />
    </Card>
  )
}
