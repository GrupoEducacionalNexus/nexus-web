import { getToken } from "./auth";

// Função para se conectar à rota SSE no servidor
const connectToSSE = (url) => {
  console.log(url);
  const eventSource = new EventSource(`${url}?token=${getToken()}`);

  eventSource.addEventListener('open', () => {
    console.log('Conexão SSE estabelecida');
  });

  eventSource.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    console.log(data.message);
  });

  eventSource.addEventListener('error', () => {
    console.log('Erro na conexão SSE');
    eventSource.close();
  });
};

export { connectToSSE };
