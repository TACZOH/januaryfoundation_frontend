import type { IIndividualApplication, IBusinessApplication, IInstitutionApplication, INominationApplication, IRaffleTicket, FormType } from "$lib/types";

export type Details = {
    type: FormType,
    data: IIndividualApplication | IBusinessApplication | IInstitutionApplication | INominationApplication | IRaffleTicket
}
