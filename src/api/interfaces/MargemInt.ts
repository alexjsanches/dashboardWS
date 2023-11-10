export interface margemInt {
  paramQtdProdutos: number;
  paramQtdParceiros: number;
  paramQtdMarcas: number;
  result: {
    [codVend: string]: {
      descricao: string;
      columnValueMap: {
        LUCRO: number;
        "%MARGEMCONTRIB":number;
        VALORVENDA: number;
        CUSTOVARIAVEL: number;
        PARTCUSTOFIXO: number;
        MARGEMCONTRIB: number;
        "%LUCRO": number;
        CUSTOGERENCIAL: number;
      };
    };
  };
}
