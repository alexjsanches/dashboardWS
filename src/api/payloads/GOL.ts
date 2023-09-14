export const apiLink = 'https://api.sankhya.com.br/gateway/v1/mge/service.sbr?serviceName=VendasGOLSP.getVendasFaturamento';

export let payloadReq = `
  <serviceRequest serviceName="VendasGOLSP.getVendasFaturamento">
    <requestBody>
      <vendas PERIODO.INI="01/09/2023" PERIODO.FIN="12/09/2023" TIPO="VENDEDOR" _id="-50" CONFIG_CONSOLIDACAO="5" EMPRESA="999,4,2,3,1,100" GERENTESUBORDINADO="false" TIPO_AGRUPAMENTO="G"/>
      <clientEventList/>
    </requestBody>
  </serviceRequest>
`;

export const contentType = 'text/xml';

// Função para atualizar a variável payloadReq
export const updatePayloadReq = (newPayload: string) => {
  payloadReq = newPayload;
};


