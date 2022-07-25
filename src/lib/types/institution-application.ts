import type { IBusinessInstitutions } from './details/business-and-institutions';
import type { IBusinessAddress } from './address/business-address';

/**
 * Model definition for Institution Application
 */
export type IInstitutionApplication = {
  id?: string;
  InstitutionDetails: IBusinessInstitutions;
  PhysicalLocation: IBusinessAddress;
  eligible?: boolean;
  date: string;
  number?: number;
  orderDetails: { [key: string]: unknown };
  body?: string;
}
