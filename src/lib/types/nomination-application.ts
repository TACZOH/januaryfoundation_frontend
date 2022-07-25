import type { IIndividualAddress } from './address/address';

/**
 * Model definition for Miscellaneous Application
 */
export type INominationApplication = {
  id?: string;
  Address: IIndividualAddress;
  FullName: string;
  Email: string;
  orderDetails?: { [key: string]: unknown };
  body?: string;
}
