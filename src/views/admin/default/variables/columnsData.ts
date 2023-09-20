import { Column } from "react-table";
import tableDataCheck from "./tableDataCheck.json";

export const columnsDataCheck = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
];
export const columnsDataComplex = [
  {
    Header: "NOME",
    accessor: "nome",
  },
  {
    Header: "QUANTIDADE",
    accessor: "quantidade",
  },
  {
    Header: "VALOR",
    accessor: "valor",
  },
  {
    Header: "% DA META",
    accessor: "progresso",
  },
];

export type ColumnData = Column[];

export type TableData = Column<{
  nome: (string | boolean)[];
  valor: string;
  progresso: number;
  quantidade: number;
  status?: string;
  artworks?: string;
  rating?: number;
}>;

export type TableProps = {
  columnsData: ColumnData;
  tableData: TableData[];
};
