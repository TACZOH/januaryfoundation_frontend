import type { IIndividualAddress } from "$lib/types";
/**
 * Model definition for Raffle Ticket
 */
// export type IRaffleTicket = {
//   id?: string;
//   date: string;
//   number: number;
//   body?: string;
//   FirstName: string;
//   LastName: string;
//   Email: string;
//   BirthDate: string;
//   Address: IIndividualAddress;
//   orderDetails: { [key: string]: unknown };
//   idNumber: string;
// }

export type IRaffleTicket = {
  id?: string;
  date: string;
  number: number;
  body?: string;
  FullName: string;
  Email: string;
  Country: string;
  orderDetails: { [key: string]: unknown };
}
