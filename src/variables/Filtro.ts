

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Badge } from '@chakra-ui/react';

export function FormattedDate() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Obtém a data atual em horário de Brasília (GMT-3)
      const now = new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' });

      // Atualiza o estado com a data atual
      setCurrentDate(new Date(now));
    }, 60000); // Atualiza a cada minuto

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = format(currentDate, "Consolidado 'até' dd-MMM", {
    timeZone: 'America/Sao_Paulo',
    locale: require('date-fns/locale/pt-BR'), // Configura o locale para português do Brasil
  });

  return (
    <Badge ml='1' fontSize='0.8em' colorScheme='green'>
      {formattedDate}
    </Badge>
  );
}
