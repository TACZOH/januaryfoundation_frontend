import { writable } from 'svelte/store';
import country from 'country-list-js';
import type { Writable } from "svelte/store";
// import type { IIndividualApplication, IBusinessApplication, IInstitutionApplication, INominationApplication, IRaffleTicket } from "$lib/types";

export const name = writable(false)
export const email = writable(false)
export const phone = writable(false)
export const ID = writable(false)
export const age = writable(false)
export const website = writable(false)
export const fName = writable(false)
export const lName = writable(false)
export const tellUsAboutYourBusiness = writable(false)

export const countries = writable(country.names().sort());
export const selectedCountry = writable("United States");
export const states = writable(country.findByName('United States')?.provinces);
export const phoneCode = writable(country.findByName('United States')?.dialing_code)
export const selectedState = writable("New York")
export const city = writable("New York")
export const PhoneNumber = writable("+1")

export const state = writable("");

// export const cookie = writable(false);

// export const cookie = () => {
//     const { subscribe, update, set } = writable({...false})
// }
function createEditable<T>(value: T) {
    const { subscribe, update, set } = writable(value);
    return { subscribe, update, set };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const data: any = {}
export const cookie = createEditable(false)
// export const details = createEditable(data)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const details: Writable<any> = writable()

export const paymentModal = createEditable(false)
export const paymentStatus = createEditable(false)
// export const details = writable(data)
// export const details = writable([{}])

export const active = writable(false);
export const fee: Writable<number | undefined> = writable(undefined);

export const donation: Writable<number> = writable();
export const donateModal: Writable<boolean> = writable(false);
export const donate: Writable<boolean> = writable(false);
