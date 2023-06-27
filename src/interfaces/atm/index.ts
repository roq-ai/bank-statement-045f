import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface AtmInterface {
  id?: string;
  location: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface AtmGetQueryInterface extends GetQueryInterface {
  id?: string;
  location?: string;
  organization_id?: string;
}
