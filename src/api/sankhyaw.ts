import axios from 'axios';
import { bearerToken, handleFetchDataApi } from './api';
import { GOL } from './interfaces/GOL';
import { apiLink, contentType, payloadReq } from './payloads/GOL';



// Função para buscar e formatar os valores da API
export async function fetchAndFormatData(): Promise<string | null> {
  try {
    await handleFetchDataApi();
    const token = bearerToken;
    const apiUrl = apiLink;

    const xmlPayload = payloadReq;
    console.log(payloadReq);

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
      const formattedValues = totalValues.join(', ');
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
