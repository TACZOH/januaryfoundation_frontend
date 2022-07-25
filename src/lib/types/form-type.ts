export type FormType = 'individual' | 'business' | 'institution' | 'nomination' | 'raffle';
export type Applications = Exclude<FormType, "raffle">;
export type Tickets = Exclude<FormType, 'individual' | 'business' | 'institution' | 'nomination'>;
