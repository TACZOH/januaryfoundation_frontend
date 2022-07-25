// menuSubitems

import { customFees, fee } from "$lib/fees"; // fees
import type { FormType, MenuSubitem } from "$lib/types";

// let test: SubitemText<FormType>

// export const raffleTickets: MenuSubitem[] = [
//     { text: `Ticket $${fees.raffle}`, link: '/raffle-ticket' }
// ]
// export const individual: MenuSubitem[] = [
//     { text: `Individual $${fees.raffle}`, link: '/raffle-ticket' }
// ]

export const setSubitems = (type: Capitalize<FormType>): MenuSubitem[] => {
    // const link = type == "Raffle" ? "/raffle-ticket" : `/applications/${type.toLowerCase()}`;
    const create = (fee: number): MenuSubitem => {
        return { text: `${type == "Raffle" ? "Ticket" : type} $${fee}`, link: type == "Raffle" ? "/raffle-ticket" : `/applications/${type.toLowerCase()}`, fee: fee }
    }
    const subitems: MenuSubitem[] = [
        // @ts-expect-error parameter type is already of type FormType
        { text: `${type == "Raffle" ? "Ticket" : type} $${fee(type.toLowerCase())}`, link: type == "Raffle" ? "/raffle-ticket" : `/applications/${type.toLowerCase()}` }
    ]

    switch (type) {
        case "Individual":
            if (customFees.individual !== undefined) {
                for (let index = 0; index < customFees.individual.length; index++) {
                    subitems.push(create(customFees.individual[index]))
                }
                return subitems;
            }
            return subitems;
            case "Business":
                if (customFees.business !== undefined) {
                    for (let index = 0; index < customFees.business.length; index++) {
                        subitems.push(create(customFees.business[index]))
                    }
                    return subitems;
                }
                return subitems;
            case "Institution":
                if (customFees.institution !== undefined) {
                    for (let index = 0; index < customFees.institution.length; index++) {
                        subitems.push(create(customFees.institution[index]))
                    }
                    return subitems;
                }
                return subitems;
            case "Nomination":
                if (customFees.nomination !== undefined) {
                    for (let index = 0; index < customFees.nomination.length; index++) {
                        subitems.push(create(customFees.nomination[index]))
                    }
                    return subitems;
                }
                return subitems;
            case "Raffle":
                if (customFees.raffle !== undefined) {
                    for (let index = 0; index < customFees.raffle.length; index++) {
                        subitems.push(create(customFees.raffle[index]))
                    }
                    return subitems;
                }
                return subitems;
    
        default:
            return subitems;
    }
}
