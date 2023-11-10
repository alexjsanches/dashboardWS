export const apiLink = 'https://api.sankhya.com.br/gateway/v1/mge/service.sbr?serviceName=VendasGOLSP.getVendasGeral';

// Função para obter a data do primeiro dia do mês corrente no formato "DD/MM/YYYY"
const getFirstDayOfPreviousMonth = () => {
  const today = new Date();
  const firstDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() , 1);
  return `${(firstDayOfPreviousMonth.getDate()).toString().padStart(2, '0')}/${(firstDayOfPreviousMonth.getMonth() + 1).toString().padStart(2, '0')}/${firstDayOfPreviousMonth.getFullYear()}`;
};

const getTodayStart = () => {
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);
  return startOfDay;
};

export let payloadReq = `
  <serviceRequest serviceName="VendasGOLSP.getVendasGeral">
    <requestBody>
      <vendas PERIODO.INI="${getFirstDayOfPreviousMonth()} 00:00:00" PERIODO.FIN="${getTodayStart().toLocaleDateString()} 23:59:59" TIPO="VENDEDOR" _id="-50" CONFIG_CONSOLIDACAO="-1" 
      EMPRESA="999,4,2,3,1,100" GERENTESUBORDINADO="false" TIPO_AGRUPAMENTO="V"/>
      <clientEventList/>
    </requestBody>
  </serviceRequest>
`;
console.log(payloadReq)
export const contentType = 'text/xml';

// Função para atualizar a variável payloadReq
export const updatePayloadReq = (newPayload: string) => {
  payloadReq = newPayload;
};
