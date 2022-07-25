import type { FormType, IIndividualApplication, IBusinessApplication, IInstitutionApplication, INominationApplication, IRaffleTicket } from "$lib/types";

// export type DataType<Type extends FormType> = Type extends "individual"
// ? IIndividualApplication
// : Type extends "business"
// ? IBusinessApplication
// : Type extends "institution"
// ? IInstitutionApplication
// : Type extends "nomination"
// ? INominationApplication
// : Type extends "raffle"
// ? IRaffleTicket
// : never;


export type DataType<Type extends IIndividualApplication | IBusinessApplication | IInstitutionApplication | INominationApplication | IRaffleTicket> = {
    [Property in keyof Type]: Type[Property];
}

// export type DefineDataType<Type extends IIndividualApplication 
// | IBusinessApplication 
// | IInstitutionApplication 
// | INominationApplication 
// | IRaffleTicket> = Type extends IIndividualApplication
// ? IIndividualApplication
// : Type extends IBusinessApplication 
// ? IBusinessApplication
// : Type extends IInstitutionApplication
// ? IInstitutionApplication
// : Type extends INominationApplication
// ? INominationApplication
// : IRaffleTicket;

export type DefineDataType<Type> = Type extends IIndividualApplication | IBusinessApplication | IInstitutionApplication | INominationApplication | IRaffleTicket ? Type : never;

// {
//     [Property in keyof Type]: Type[Property]
// };

// Type extends IIndividualApplication
//     ? IIndividualApplication
//     : NameLabel;


// type Data = DefineDataType<IIndividualApplication>;

// const data: Data = {
//     FullName: "",
//     Email: "",
//     PhoneNumber: "",
//     Address: {
//         id: undefined,
//         country: "",
//         city: undefined,
//         state: undefined
//     },
//     birthdate: "",
//     date: "",
//     number: 0,
//     idNumber: "",
//     orderDetails: {}
// }

// export const DefineDataType = <Type>(data: Type): Type => {
//     return data
// }

// let ticket: DefineDataType<IIndividualApplication | IBusinessApplication | IInstitutionApplication | INominationApplication | IRaffleTicket>;

// ticket = DefineDataType(data)

// const data: DefineDataType<IIndividualApplication | IBusinessApplication | IInstitutionApplication | INominationApplication> = {}
