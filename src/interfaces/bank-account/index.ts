import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BankAccountInterface {
  id?: string;
  balance: number;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface BankAccountGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
