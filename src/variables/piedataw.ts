import  { useState, useEffect } from 'react';
import { fetchAndFormatData, getToken } from 'api/requests/sankhyaw'; // Importe a função getToken

export async function piedataw() {
  const [udiPercent, setUdiPercent] = useState<number | null>(null);
  const [gynPercent, setGynPercent] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getToken(); // Obtenha o token primeiro
        if (token !== null) {
          const response = await fetchAndFormatData(token);
          if (response !== null) {
            const { percentValue1, percentValue2 } = response;

            setUdiPercent(percentValue1);
            setGynPercent(percentValue2);
          } else {
            console.error('Erro ao formatar os dados.');
            setUdiPercent(0);
          }
        } else {
          console.error('Não foi possível obter o token.');
          setUdiPercent(0);
        }
      } catch (error) {
        console.error(0, error);
        setUdiPercent(0);
      }
    }

    // Chama a função fetchData quando o componente é montado
    fetchData();

    // Define um intervalo para atualizar os dados a cada 10 segundos
    const intervalId = setInterval(fetchData, 10000);

    // Limpa o intervalo quando o componente é desmontado
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return [udiPercent, gynPercent]; // Retorne os valores como um array
}

// Fora da função, você pode chamar piedataw() para obter os valores como um array
export const chartDataWS = piedataw();
