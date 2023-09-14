import fetch from 'node-fetch';

let bearerToken: string = ''; // Variável para armazenar o token
const apiEndpoint = 'https://api.sankhya.com.br/login';
const appKey = '2a1e93b9-4f51-41e5-941f-45d783c3dd90';
const username = 'alexandre.sanches@worldseg.com.br';
const password = '862485inteliX!';

// Função para obter um novo Bearer Token
async function getBearerToken() {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'token': '68e350b2-690f-4450-affd-bb1bf1f4a5fa',
        'appkey': appKey,
        'username': username,
        'password': password,
      } as Record<string, string>, // Defina o tipo explícito para o objeto de cabeçalho
    });

    if (response.status === 200) {
      const data = await response.json();
      if (data.bearerToken) {
        bearerToken = data.bearerToken; // Atualiza o token
        console.log('Bearer Token atualizado:', bearerToken);
        return bearerToken; // Retorna o token
      } else {
        console.error('Chave "bearerToken" não encontrada na resposta JSON.');
        throw new Error('Chave "bearerToken" não encontrada na resposta JSON.');
      }
    } else {
      console.error('Erro ao obter o token:', response.status, response.statusText);
      throw new Error(`Erro ao obter o token: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Erro na solicitação:', error);
    throw error;
  }
}

// Função a ser chamada quando o botão for clicado
async function handleFetchDataApi() {
  try {
    await getBearerToken(); // Chama a função para obter o token quando o botão é clicado
  } catch (error) {
    console.error('Erro ao obter o token:', error);
  }
}

// Exporte a função handleFetchDataApi e o bearerToken
export { handleFetchDataApi, bearerToken };
