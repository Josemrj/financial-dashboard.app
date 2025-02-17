export type Category = 
  | 'food'
  | 'transport'
  | 'housing'
  | 'leisure'
  | 'health'
  | 'education'
  | 'other';

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  category: Category;
  description: string;
}

export interface CategoryTotal {
  category: Category;
  total: number;
}