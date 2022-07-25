import type { IIndividualAddress } from './address/address';

/**
 * Model definition for Individual Application
 */
export type IIndividualApplication = {
  id?: string;
  FullName: string;
  Email: string;
  Address: IIndividualAddress;
  date: string;
  number: number;
  orderDetails: { [key: string]: unknown };
  body?: string;
}
