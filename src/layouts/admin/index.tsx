// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react'
import Footer from 'components/footer/FooterAdmin'
// Layout components
import Sidebar from 'components/sidebar/Sidebar'
import { PropsWithChildren, useEffect, useState } from 'react'
import routes from 'routes'


interface DashboardLayoutProps extends PropsWithChildren {
  [x: string]: any
}

// Custom Chakra theme
export default function AdminLayout (props: DashboardLayoutProps) {
  const { children, ...rest } = props
  

  useEffect(() => {
    window.document.documentElement.dir = 'ltr'
  })

  return (
    <Box>
      
        <Sidebar routes={routes} display='none' {...rest} />
        <Box
          float='right'
          minHeight='100vh'
          height='100%'
          overflow='auto'
          position='relative'
          maxHeight='100%'
          w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
          transitionDuration='.2s, .2s, .35s'
          transitionProperty='top, bottom, width'
          transitionTimingFunction='linear, linear, ease'
        >
         

          <Box
            mx='auto'
            p={{ base: '10px', md: '30px' }}
            pe='20px'
            minH='100vh'
            mt='-80px'
            
          >
            {children}
          </Box>
          <Box>
            <Footer />
          </Box>
        </Box>
    </Box>
  )
}
