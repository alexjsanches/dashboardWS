import axios from 'axios';
import { GOL } from './interfaces/GOL';
import { apiLink, contentType, payloadReq } from './payloads/GOL';

// Função para buscar e formatar os valores da API
export async function fetchAndFormatData(token: string): Promise<{ formattedValue1: string, formattedValue2: string, percentValue1: number, percentValue2: number } | null> {
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

    if (data && data.result) {
      const totalValues = Object.values(data.result).map((result) => {
        if (typeof result === 'object' && 'columnValueMap' in result) {
          return (result as unknown as GOL).columnValueMap.total;
        }
        return 0; // Valor padrão ou tratamento de erro, se a propriedade não existir
      });

      const [udiValue, gynValue] = totalValues;
      const total = udiValue + gynValue;

      const formattedValues = {
        formattedValue1: udiValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        formattedValue2: gynValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        percentValue1: (udiValue / total) * 100,
        percentValue2: (gynValue / total) * 100,
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
export async function getToken(): Promise<string | null> {
  try {
    const tokenResponse = await axios.get('http://localhost:3000/api/token');
    return tokenResponse.data.token;
  } catch (error) {
    console.error('Erro ao obter o token:', error);
    return null;
  }
}

// Função principal que obtém o token e depois chama fetchAndFormatData
export async function fetchDataWithToken() {
  const token = await getToken();
  if (token) {
    const formattedData = await fetchAndFormatData(token);
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
