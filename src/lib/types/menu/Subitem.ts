import type { SubitemText, FormType } from "$lib/types";

export type MenuSubitem = { text: SubitemText<FormType>, link: string, fee?: number };
