import { phone } from "phone";
// import Cookies from 'js-cookie';
// import { validInput } from "$lib/formValidation";
import type { IIndividualApplication, IBusinessApplication, IInstitutionApplication, INominationApplication, IRaffleTicket } from "$lib/types";
import type { FormType, Data } from "$lib/types";
import { count } from "$lib/count";
import axios from 'axios';
import { config } from "$lib/vars";
import { API } from "$lib/api";
// import { goto } from "$app/navigation";
// import { cookie, details } from "$lib/stores";

export class Form {
  public _data!: IIndividualApplication | IBusinessApplication | IInstitutionApplication | INominationApplication | IRaffleTicket;
  public error: Error | undefined;
  public type!: FormType;
  public number!: number | undefined;
  public _valid!: boolean;


  public get valid(): boolean {
    return this._valid;
  }
  public set valid(value: boolean) {
    this._valid = value;
  }

  public constructor(
    type: FormType,
  ) {
    this.type = type;
  }

  public set data(value: IIndividualApplication | IBusinessApplication | IInstitutionApplication | INominationApplication | IRaffleTicket) {
    localStorage.setItem("data", JSON.stringify(value));
    // Cookies.set("data", JSON.stringify(value));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this._data = value;
  }

  public get data(): IIndividualApplication | IBusinessApplication | IInstitutionApplication | INominationApplication | IRaffleTicket {
    return this._data;
  }

  public async setNumber(): Promise<number> {
    return this.number = await count({ type: this.type });
    // this.error = this.inRange(this.number, 40000) ? undefined : this.Err(`Value of number should be between 0 and 40000`);
    // if(this.error instanceof Error) {
    //   this.number = undefined;
    //   throw this.error;
    // } else {
    //   return this.number;
    // }
  }


  public async submit(
    data: unknown, order: unknown, requestData: IIndividualApplication
      | IBusinessApplication
      | IInstitutionApplication
      | INominationApplication
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      | IRaffleTicket = JSON.parse(localStorage.getItem('data')!) ?? this.data) {
    return await axios.post(`${config.ENDPOINT_URL}${API(this.type)}`, requestData)
      .then(async (result) => {
        await axios.put(`${config.ENDPOINT_URL}${API(this.type)}/${result.data.id}`, {
          orderDetails: {
            data: data,
            order: order
          }
        })
        // .then((response) => {
        //   Cookies.set("details", JSON.stringify(response.data), { expires: 365, secure: true, sameSite: 'strict', path: '/details' });
        //   cookie.set(true);
        //   Cookies.remove("data");
        // });
        // Cookies.set("details", JSON.stringify(requestData), { expires: 365, secure: true, sameSite: 'strict', path: '/details' });
        // Cookies.set("details", JSON.stringify([requestData]), { expires: 365, secure: true, sameSite: 'strict', path: '/details' });
        // cookie.set(true);
        // details.set(requestData)
        // Cookies.remove("data");
        // location.href = `/${API(this.type)}/${await result.data.id}`;
        // goto("/thanks");
      });
  }

  // public setCookie(value: string) {
  //   // cookie.set(true)
  //   // details.set(value)
  //   // Cookies.set("details", value);
  // }

  protected Err(message: string): Error {
    console.error(message)
    throw new Error(message);
  }

  public Phone(number: string, config?: { country?: string, validateMobilePrefix?: boolean, strictDetection?: boolean }): {
    valid: boolean,
    number: string
  } {
    return Phone(number, config);
  }

  public inRange(number: number, end: number, start?: number): boolean {
    start = start == undefined ? 0 : start;
    return number >= start && number <= end;
  }

  public Regex(string: string, pattern: string | RegExp): boolean {
    const regex = new RegExp(pattern);
    return regex.test(string);
  }

  public set<Type>(data: Type): Type {
    return data;
  }

  public define: Define = {
    application: {
      individual: (data: Data): IIndividualApplication => {
        return ({
          FullName: data.FullName,
          Email: data.Email,
          date: data.date,
          number: data.number,
          orderDetails: data.orderDetails,
          Address: {
            country: data.Address.country,
            state: data.Address.state
          },
          body: data.body
        });
      },
      business: (data: Data): IBusinessApplication => {
        return ({
          Business: {
            OrganizationLegalName: data.Organization.OrganizationLegalName,
            Email: data.Organization.Email,
            PhoneNumber: data.Organization.PhoneNumber,
            Website: data.Organization.Website
          },
          PhysicalLocation: {
            country: data.PhysicalLocation.country,
            state: data.PhysicalLocation.state
          },
          date: data.date,
          number: data.number,
          orderDetails: data.orderDetails,
          body: data.body
        });
      },
      institution: (data: Data) => {
        return ({
          InstitutionDetails: {
            OrganizationLegalName: data.Organization.OrganizationLegalName,
            Email: data.Organization.Email,
            PhoneNumber: data.Organization.PhoneNumber,
            Website: data.Organization.Website
          },
          PhysicalLocation: {
            country: data.PhysicalLocation.country,
            state: data.PhysicalLocation.state
          },
          date: data.date,
          number: data.number,
          orderDetails: data.orderDetails,
          body: data.body
        });
      },
      nomination: (data: Data): INominationApplication => {
        return ({
          Address: {
            country: data.Address.country
          },
          FullName: data.FullName,
          Email: data.Email,
          body: data.body
        });
      }
    },
    ticket: {
      raffle: (data: Data): IRaffleTicket => {
        return ({
          date: data.date,
          number: data.number,
          FullName: data.FullName,
          Email: data.Email,
          Country: data.Address.country,
          orderDetails: data.orderDetails,
          body: data.body
        });
      }
    }
  }

  // public defineApplication(
  //   data: Data
  // ):
  //   | IIndividualApplication
  //   | IBusinessApplication
  //   | IInstitutionApplication
  //   | INominationApplication {
  //   switch (this.type) {
  //     case 'individual':
  //       return ({
  //         FullName: data.FullName,
  //         Email: data.Email,
  //         PhoneNumber: data.PhoneNumber,
  //         birthdate: data.birthdate,
  //         idNumber: data.idNumber,
  //         date: data.date,
  //         number: data.number,
  //         orderDetails: data.orderDetails,
  //         Address: {
  //           country: data.Address.country,
  //           state: data.Address.state,
  //           city: data.Address.city
  //         },
  //         body: data.body
  //       });
  //     case 'business':
  //       return ({
  //         Business: {
  //           OrganizationLegalName: data.Organization.OrganizationLegalName,
  //           Email: data.Organization.Email,
  //           PhoneNumber: data.Organization.PhoneNumber,
  //           Website: data.Organization.Website,
  //           PrincipalOwners: data.Organization.PrincipalOwners
  //         },
  //         PhysicalLocation: {
  //           country: data.PhysicalLocation.country,
  //           state: data.PhysicalLocation.state,
  //           city: data.PhysicalLocation.city,
  //           street: data.PhysicalLocation.street,
  //           optional: data.PhysicalLocation.optional,
  //           building: data.PhysicalLocation.building
  //         },
  //         date: data.date,
  //         number: data.number,
  //         orderDetails: data.orderDetails
  //       });
  //     case 'institution':
  //       return ({
  //         InstitutionDetails: {
  //           OrganizationLegalName: data.Organization.OrganizationLegalName,
  //           Email: data.Organization.Email,
  //           PhoneNumber: data.Organization.PhoneNumber,
  //           Website: data.Organization.Website,
  //           PrincipalOwners: data.Organization.PrincipalOwners
  //         },
  //         PhysicalLocation: {
  //           country: data.PhysicalLocation.country,
  //           state: data.PhysicalLocation.state,
  //           city: data.PhysicalLocation.city,
  //           street: data.PhysicalLocation.street,
  //           optional: data.PhysicalLocation.optional,
  //           building: data.PhysicalLocation.building
  //         },
  //         date: data.date,
  //         number: data.number,
  //         orderDetails: data.orderDetails
  //       });
  //     case 'nomination':
  //       return ({
  //         Address: {
  //           country: data.Address.country,
  //           city: data.Address.city,
  //           state: data.Address.state
  //         },
  //         FullName: data.FullName,
  //         Email: data.Email
  //       });
  //     case 'raffle':
  //       return ({
  //         date: data.date,
  //         number: data.number,
  //         FirstName: data.FirstName,
  //         LastName: data.LastName,
  //         Email: data.Email,
  //         BirthDate: data.birthdate,
  //         Country: data.Address.country,
  //         orderDetails: data.orderDetails,
  //         idNumber: data.idNumber
  //       });
  //     // default:
  //     // 	console.error(`Invalid data: Parameter "data" must be one of the following types: "IIndividualApplication", "IBusinessApplication", "IInstitutionApplication", "INominationApplication")`);
  //     // 	throw new Error(`Invalid data: Parameter "data" must be one of the following types: "IIndividualApplication", "IBusinessApplication", "IInstitutionApplication", "INominationApplication")`);
  //   }
  // }

  // public validate: Validate = {
  //   name: (value: string): boolean => {
  //     return validInput(value, "name");
  //   },
  //   email: (value: string): boolean => {
  //     return validInput(value, "email");
  //   },
  //   phone: (value: string): boolean => {
  //     return validInput(value, "phone");
  //   },
  //   ID: (value: string): boolean => {
  //     return validInput(value, "ID");
  //   },
  //   date: (value: string): boolean => {
  //     return validInput(value, "date");
  //   },
  //   age: (dateString: string): boolean => {
  //     const birthDate = new Date(dateString);
  //     const today = new Date();
  //     let age = today.getFullYear() - birthDate.getFullYear();
  //     const m = today.getMonth() - birthDate.getMonth();
  //     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //       age--;
  //     }
  //     if (age < 18) {
  //       return false;
  //     } else return true;
  //   }
  // };
}

type Define = {
  application: {
    individual: (data: Data) => IIndividualApplication,
    business: (data: Data) => IBusinessApplication,
    institution: (data: Data) => IInstitutionApplication,
    nomination: (data: Data) => INominationApplication
  },
  ticket: {
    raffle: (data: Data) => IRaffleTicket
  }
}

interface FormattedNumber {
  readonly valid: true;
  number: string;
}
interface ProblematicNumber {
  readonly valid: false;
  number: string;
}

// type Validate = {
//   name: (value: string) => boolean;
//   email: (value: string) => boolean;
//   phone: (value: string) => boolean;
//   ID: (value: string) => boolean;
//   date: (value: string) => boolean;
//   age: (dateString: string) => boolean;
// }

type PhoneNumberResult = FormattedNumber | ProblematicNumber;

function Phone(phoneNumber: string, config?: { country?: string, validateMobilePrefix?: boolean, strictDetection?: boolean }): PhoneNumberResult {
  const PhoneResult = phone(phoneNumber, config)
  const number: string = typeof PhoneResult.phoneNumber === 'string' ? PhoneResult.phoneNumber : phoneNumber;
  return {
    valid: PhoneResult.isValid,
    number: number
  };
};
