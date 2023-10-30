import React from 'react';
import { Box } from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';

import 'styles/Fade.module.css';
import AdminNavbarLinks from 'components/navbar/NavbarLinksAdmin'


export default function UserReports() {


  return (
    <AdminLayout>
      <Box
        pt={{
          base: '130px',
          md: '80px',
          xl: '80px',
        }}
      >
        <Box mb='20px' className={`fade-transition fade-in`}>
          <iframe src="https://www.appsheet.com/start/e9c3036b-51a8-478e-88c1-abf24a7d47ae?platform=desktop"  width='100%' height='789px' style={{borderRadius: '15px'}} ></iframe>
        </Box>
      </Box>
      <AdminNavbarLinks secondary={false} />
    </AdminLayout>
  );
}
