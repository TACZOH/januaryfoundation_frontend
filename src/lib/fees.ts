import type { FormType, CustomFees } from "$lib/types";

type Fee = {
    (value: FormType): number;
}

// type Fee = {
//     (value: FormType, custom?: boolean): number | number[]
// }

export const fees = {
    individual: 1,
    business: 10,
    institution: 100,
    nomination: 10,
    raffle: 1,
}

export const customFees: CustomFees = {
    raffle: [5,10]
}


export const fee: Fee = (type: FormType): number => {
    switch (type) {
        case "individual":
            return fees.individual;
        case "business":
            return fees.business;
        default:
        case "institution":
            return fees.institution;
        case "nomination":
            return fees.nomination;
        case "raffle":
            return fees.raffle;
    }
}

// export const fee: Fee = (type: FormType, custom = false): number | number[] => {
//     if(custom) {
//         switch (type) {
//             case "individual":
//                 return customFees.individual;
//             case "business":
//                 return customFees.business;
//             default:
//             case "institution":
//                 return customFees.institution;
//             case "nomination":
//                 return customFees.nomination;
//             case "raffle":
//                 return customFees.raffle;
//         }
//     } else {
//         switch (type) {
//             case "individual":
//                 return fees.individual;
//             case "business":
//                 return fees.business;
//             default:
//             case "institution":
//                 return fees.institution;
//             case "nomination":
//                 return fees.nomination;
//             case "raffle":
//                 return fees.raffle;
//         }
//     }
// }
