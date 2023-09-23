  export const apiLink = 'https://api.sankhya.com.br/gateway/v1/mge/service.sbr?serviceName=VendasGOLSP.getVendasFaturamento';

  const getYesterday = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return `${yesterday.getDate().toString().padStart(2, '0')}/${(yesterday.getMonth() + 1).toString().padStart(2, '0')}/${yesterday.getFullYear()}`;
  };

  const getTodayStart = () => {
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay;
  };


  export let payloadReq = `
  <serviceRequest serviceName="VendasGOLSP.getVendasFaturamento">
  <requestBody>
    <vendas PERIODO.INI="${getTodayStart().toLocaleDateString()} 00:00:00" PERIODO.FIN="${getTodayStart().toLocaleDateString()} 23:59:59" TIPO="VENDEDOR" _id="-50" CONFIG_CONSOLIDACAO="-1" EMPRESA="999,4,2,3,1,100" GERENTESUBORDINADO="false" TIPO_AGRUPAMENTO="G"/>
    <clientEventList/>
  </requestBody>
  </serviceRequest>
  `;
  console.log(payloadReq)
  export const contentType = 'text/xml';
