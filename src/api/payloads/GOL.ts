export const apiLink = 'https://api.sankhya.com.br/gateway/v1/mge/service.sbr?serviceName=VendasGOLSP.getVendasFaturamento';

// Função para obter a data do primeiro dia do mês corrente no formato "DD/MM/YYYY"
const getFirstDayOfPreviousMonth = () => {
  const today = new Date();
  const firstDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() , 1);
  return `${(firstDayOfPreviousMonth.getDate()).toString().padStart(2, '0')}/${(firstDayOfPreviousMonth.getMonth() + 1).toString().padStart(2, '0')}/${firstDayOfPreviousMonth.getFullYear()}`;
};

// Função para obter a data de ontem no formato "DD/MM/YYYY"
const getYesterday = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return `${yesterday.getDate().toString().padStart(2, '0')}/${(yesterday.getMonth() + 1).toString().padStart(2, '0')}/${yesterday.getFullYear()}`;
};

export let payloadReq = `
  <serviceRequest serviceName="VendasGOLSP.getVendasFaturamento">
    <requestBody>
      <vendas PERIODO.INI="${getFirstDayOfPreviousMonth()}" PERIODO.FIN="${getYesterday()}" TIPO="VENDEDOR" _id="-50" CONFIG_CONSOLIDACAO="5" EMPRESA="999,4,2,3,1,100" GERENTESUBORDINADO="false" TIPO_AGRUPAMENTO="G"/>
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
