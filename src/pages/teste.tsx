import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';
import 'styles/Fade.module.css';
import { fetchAndFormatData, getToken } from 'api/requests/margemReq';
import AdminNavbarLinks from 'components/navbar/NavbarLinksAdmin'
import Bloco4 from 'views/admin/profile/components/bloco4';



export default function UserReports() {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [percMargem, setPercMargem] = useState<{ [codVend: string]: number } | null>(null);




  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getToken();
        if (token !== null) {
          const response = await fetchAndFormatData(token);
          if (response !== null) {
            setPercMargem(response);
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
        <Bloco4
              isLoadingData={isLoadingData}
              percMargem={percMargem}
              
            />
        </Box>
      </Box>
      <AdminNavbarLinks secondary={false} />
    </AdminLayout>
  );
}
