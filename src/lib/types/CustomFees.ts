import type { FormType } from "$lib/types";

export type CustomFees = {
    [key in FormType]?: number[];
};
