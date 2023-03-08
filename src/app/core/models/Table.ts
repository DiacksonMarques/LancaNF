export interface ColumnsTable{
  tableColumn: string;
  columnName: string;
  size?: number;
  complement?: string;
  mask?: string;
}

export interface SortTable{
  active: string;
  direction: 'asc' | 'desc' | '';
}

export interface FilterTable{
  colunm?: string;
  mask?: string;
  value?: any;
  placeholder?: string;
  displayValueSelect?: any[];
  type?: string;
  filter: string;
}

export interface FilterTableForm{
  columnFilter: FilterTable;
  colunm?: string;
  value?: any;
  filter: string;
}
