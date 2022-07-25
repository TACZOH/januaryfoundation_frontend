import Cookies from "js-cookie";
import type { IIndividualApplication, IBusinessApplication, IInstitutionApplication, INominationApplication, IRaffleTicket, FormType, Details } from "$lib/types";

export async function get() {
    const string = Cookies.get("details");

    if (string == undefined) {
        return {
            status: 404
        }
    } else {
        const details: Details[] = JSON.parse(string);
        return {
            status: 200,
            body: { details }
        }
    }
}

export async function post({ type, data }: {type: FormType, data: IIndividualApplication | IBusinessApplication | IInstitutionApplication | INominationApplication | IRaffleTicket}) {
    const details: Details[] = [];
    if (Cookies.get('details') == undefined) {
        details.push({ type, data });
        Cookies.set('details', JSON.stringify(details), { expires: 365, secure: true, sameSite: 'strict', path: '/details' })
        return {
            status: 201
        }
    } else {
        details.push({ type, data });
        Cookies.set('details', JSON.stringify(details), { expires: 365, secure: true, sameSite: 'strict', path: '/details' })
    }

    
    // const updateDetails = (type: FormType, data: DataType): Details => {
    //     return {
    //         type: type,
    //         data: data
    //     }
    // }

    // const [errors, item] = await db.create(data);

    //   if (Error) {
    //     // return validation errors
    //     return {
    //       status: 400,
    //       body: { errors }
    //     };
    //   }

    // redirect to the newly created item
    //   return {
    //     status: 303,
    //     headers: {
    //       location: `/items/${item.id}`
    //     }
    //   };
}