/**
 * category: income, transaction, investment, saving
 * id will be a uuid generated unique string
 */
export type Transaction = {
  id: string,
  category: string,
  amount: number,
  title: string,
  description: string
}

