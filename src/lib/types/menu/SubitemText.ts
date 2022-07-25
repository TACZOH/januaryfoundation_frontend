import type { FormType } from "$lib/types";

export type SubitemText<Type extends FormType> = Type extends "raffle" ? `Ticket $${number}` : `${Capitalize<Type>} $${number}`;
// type SubitemText<Type extends FormType> = Type extends "raffle" ? `${Capitalize<Type>} Ticket $${number}` : `${Capitalize<Type>} Application $${number}`;
