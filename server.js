const express = require('express');
const app = express();
const fetch = require('node-fetch');
const axios = require('axios');
const cors = require('cors'); // Importe o pacote cors

// Configurações
const port = process.env.PORT || 3000;

let bearerToken = '';
const apiEndpoint = 'https://api.sankhya.com.br/login';
const appKey = '2a1e93b9-4f51-41e5-941f-45d783c3dd90';
const username = 'alexandre.sanches@worldseg.com.br';
const password = '862485inteliX!';
const contentType = 'text/xml';

// Use o middleware CORS antes de definir suas rotas
app.use(cors());

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
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      if (data.bearerToken) {
        bearerToken = data.bearerToken;
        return bearerToken;
      } else {
        throw new Error('Chave "bearerToken" não encontrada na resposta JSON.');
      }
    } else {
      throw new Error(`Erro ao obter o token: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
}

// Rota para buscar e retornar o Bearer Token
app.get('/api/token', async (req, res) => {
  try {
    const token = await getBearerToken();
    if (token !== null) {
      res.json({ token });
    } else {
      res.status(500).json({ error: 'Erro ao obter o token' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro na requisição' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});