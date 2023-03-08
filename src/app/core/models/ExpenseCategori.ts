export interface ExpenseCategori{
  id: number;
  nameCategori: string;
  descriptionCategori: string;
  filed: boolean
}

export interface ExpenseCategoriGrapgic extends ExpenseCategori{
  valueTotalCategori: number;
}
