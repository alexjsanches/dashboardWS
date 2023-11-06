import { fetchAndFormatData } from './requests/sankhyaw';
import axios from 'axios';

export async function getToken(): Promise<string | null> {
    try {
      const tokenResponse = await axios.get('https://serverws2.onrender.com/api/token');
      return tokenResponse.data.token;
    } catch (error) {
      console.error('Erro ao obter o token:', error);
      return null;
    }
  }

export async function getTokenAndFormattedData() {
  const token = await getToken(); // Certifique-se de que getToken está definida ou importada neste arquivo.
  if (token) {
    const formattedData = await fetchAndFormatData(token);
    return { token, formattedData };
  } else {
    console.error('Não foi possível obter o token.');
    return null;
  }
}
