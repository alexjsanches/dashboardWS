import axios from 'axios';
import { GOL } from '../interfaces/GOL';
import { apiLink, contentType, payloadReq } from '../payloads/GOL_Diario';


export async function fetchAndFormatDataHj(token: string): Promise<{ udiSFormatHj: number, gynSFormatHj: number } | null> {
  try {
    const apiUrl = apiLink;
    const xmlPayload = payloadReq;
    const response = await axios.post(
      apiUrl,
      xmlPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': contentType,
        },
      }
    );

    const xmlResponse = response.data;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlResponse, contentType);
    const jsonText = xmlDoc.querySelector('json').textContent;
    const data = JSON.parse(jsonText);
    console.log(data);

    if (data && data.result) {
      const totalValues = Object.values(data.result).map((result) => {
        if (typeof result === 'object' && 'columnValueMap' in result) {
          return (result as unknown as GOL).columnValueMap.total;
        }
        return 0; // Valor padrão ou tratamento de erro, se a propriedade não existir
      });

      const [udiValue, gynValue] = totalValues;

      const formattedValues = {
        udiSFormatHj: udiValue,
        gynSFormatHj: gynValue,
      };

      return formattedValues;
    } else {
      console.error('Resposta da API não está na estrutura esperada.');
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

// Função para obter o token
export async function getTokenHj(): Promise<string | null> {
  try {
    const tokenResponse = await axios.get('https://serverws2.onrender.com/api/token');
    return tokenResponse.data.token;
  } catch (error) {
    console.error('Erro ao obter o token:', error);
    return null;
  }
}

// Função principal que obtém o token e depois chama fetchAndFormatData
export async function fetchDataWithToken() {
  const token = await getTokenHj();
  if (token) {
    const formattedData = await fetchAndFormatDataHj(token);
    if (formattedData) {
      console.log('Dados formatados:', formattedData);
    } else {
      console.error('Erro ao formatar os dados.');
    }
  } else {
    console.error('Não foi possível obter o token.');
  }
}

// Chame a função principal para obter dados com token
fetchDataWithToken();
