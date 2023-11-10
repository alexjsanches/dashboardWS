import axios from 'axios';
import { apiLink, contentType, payloadReq } from '../payloads/margemPay';
import { parseString } from 'xml2js';
import { promisify } from 'util';

// Importe a interface margemInt
import { margemInt } from 'api/interfaces/MargemInt';

export async function fetchAndFormatData(token: string): Promise<{ [codVend: string]: number } | null> {
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

    const parseStringPromise = promisify(parseString);
    const jsonData = await parseStringPromise(xmlResponse);

    if (
      jsonData &&
      typeof jsonData === 'object' &&
      'serviceResponse' in jsonData &&
      jsonData.serviceResponse &&
      typeof jsonData.serviceResponse === 'object' &&
      'responseBody' in jsonData.serviceResponse &&
      jsonData.serviceResponse.responseBody &&
      Array.isArray(jsonData.serviceResponse.responseBody) &&
      jsonData.serviceResponse.responseBody.length > 0 &&
      'json' in jsonData.serviceResponse.responseBody[0] &&
      jsonData.serviceResponse.responseBody[0].json
    ) {
      const data = JSON.parse(jsonData.serviceResponse.responseBody[0].json[0]);

      if (data && data.result) {
        const formattedValues: { [codVend: string]: number } = {};

        for (const codVend in data.result) {
          if (data.result.hasOwnProperty(codVend)) {
            const vendedor = data.result[codVend];
            const percMargem = vendedor.columnValueMap['%MARGEMCONTRIB'];

            // Faça algo com percMargem, por exemplo, imprima no console
            console.log(`Vendedor ${codVend}: Percentual de Margem = ${percMargem}`);

            formattedValues[codVend] = percMargem;
          }
        }

        return formattedValues;
      } else {
        console.error('Resposta da API não está na estrutura esperada.');
        return null;
      }
    } else {
      console.error('Resposta da API não está na estrutura esperada.');
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

export async function getToken(): Promise<string | null> {
  try {
    const tokenResponse = await axios.get('https://serverws2.onrender.com/api/token');
    return tokenResponse.data.token;
  } catch (error) {
    console.error('Erro ao obter o token:', error);
    return null;
  }
}

export async function fetchDataWithToken() {
  const token = await getToken();
  if (token) {
    const formattedData = await fetchAndFormatData(token);
    if (formattedData) {
      console.log('Margens em percentual:', formattedData);
    } else {
      console.error('Erro ao formatar os dados.');
    }
  } else {
    console.error('Não foi possível obter o token.');
  }
}

fetchDataWithToken();
