export interface GOL {
    columnValueMap: any;
    paramQtdProdutos: number;
    paramQtdParceiros: number;
    paramQtdMarcas: number;
    result: {
      [unidadeId: string]: {
        descricao: string;  
        columnValueMap: {
          total: number;
          [key: string]: number;
        };
      };
    };
  }