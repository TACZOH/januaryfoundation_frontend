import type { FormType, StrapiAPIEndpoint, APIs } from "$lib/types"

export const api: APIs = {
    individual: "individual-applications",
    business: "business-applications",
    institution: "institution-applications",
    nomination: "nomination-applications",
    raffle: "raffle-tickets",
};

let endpoint: StrapiAPIEndpoint;

export const API = (type: FormType): StrapiAPIEndpoint => {
    switch (type) {
        case "individual":
            endpoint = api.individual;
            break;
        case "business":
            endpoint = api.business;
            break;
        case "institution":
            endpoint = api.institution;
            break;
        case "nomination":
            endpoint = api.nomination;
            break;
        case "raffle":
            endpoint = api.raffle;
            break;
        default:
            break;
    }
    return endpoint;
}
