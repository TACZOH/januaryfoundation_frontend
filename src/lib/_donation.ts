import { loadScript as ppScript } from '@paypal/paypal-js';
import type {
    OnApproveData,
    OrderResponseBody
} from '@paypal/paypal-js'
import { paymentModal, paymentStatus, donation } from "$lib/stores";
import { get } from "svelte/store";

export class Donation implements IDonation {
    public config!: ScriptOptions;
    private _script!: typeof window.paypal;
    private _amount: number = get(donation);
    public container: string | HTMLElement;
    public donate = false;
    private _response: unknown;

    public get response(): unknown {
        return this._response;
    }
    public set response(value: unknown) {
        this._response = value;
    }

    private set amount(value: number ) {
        this._amount = value;
    }

    public get amount(): number {
        return this._amount;
    }

    public get script() {
        return this._script;
    }
    private set script(value) {
        this._script = value;
    }

    public constructor(
        config: ScriptOptions,
        container: string | HTMLElement
    ) {
        this.config = config;
        this.container = container;
    }

    public getConfig(): boolean {
        return this.config !== undefined ? true : false;
    }

    public async loadScript(): Promise<typeof window.paypal> {
        try {
            return this.getConfig() ? this.script = await ppScript(this.config) : undefined;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Failed to load the PayPal JS SDK script", error);
                throw new Error("Failed to load the PayPal JS SDK script");
            }
        }
    }

    /**
     * Renders script with PayPal Buttons inside your container element and creates order;
     */
    public async checkout(
        style: Style = {
            color: "blue",
            shape: "pill"
        }) {
        this.amount = get(donation);
        const amount = this.amount;
        try {
            return typeof this.script == "undefined" || this.script == null ? (await this.loadScript()) : (
                // @ts-expect-error Buttons only undefined when not used
                await this.script.Buttons({
                    style: style,
                    createOrder: function (data, actions) {
                        // Set up the transaction
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: 'USD',
                                        value: `${amount}`
                                    }
                                }
                            ]
                        });
                    },
                    onApprove: async function (data, actions) {
                        if (typeof actions.order !== "undefined") {
                            return actions.order.capture().then(() => {
                                paymentStatus.set(false);
                                setTimeout(() => {
                                    paymentModal.set(true), 3 * 1000
                                })
                            })
                        }
                    },
                    onError: function (err) {
                        // Log error if something goes wrong during approval
                        paymentStatus.set(true);
                        setTimeout(() => paymentModal.set(true), 3 * 1000)
                        if (err instanceof Error) {
                            console.error('Something went wrong', err);
                            throw new Error(`Error: ${err.name}. ${err.message}`);
                        }
                    }
                })
                    .render(this.container)
                    .catch((error) => {
                        console.error("Failed to load the PayPal JS SDK script", error);

                    })

            )
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error: ${error.name}. ${error.message}`, error);
                throw new Error(`Error: ${error.name}. ${error.message}`);
            }
        }
    }
}

let OrderResponseBody: OrderResponseBodyCustom;

type OrderResponseBodyCustom = {
    data?: OnApproveData,
    order: OrderResponseBody
};


type PayPalScriptQueryParameters = {
    "buyer-country"?: string;
    "client-id": string;
    commit?: boolean;
    components?: string;
    currency?: string;
    debug?: boolean | string;
    "disable-card"?: string;
    "disable-funding"?: string;
    "enable-funding"?: string;
    "integration-date"?: string;
    intent?: string;
    locale?: string;
    // loadScript() supports an array and will convert it
    // to the correct merchant-id and data-merchant-id string values
    "merchant-id"?: string[] | string;
    vault?: boolean | string;
}

type PayPalScriptDataAttributes = {
    "data-client-token"?: string;
    "data-csp-nonce"?: string;
    "data-client-metadata-id"?: string;
    "data-merchant-id"?: string;
    "data-namespace"?: string;
    "data-page-type"?: string;
    "data-partner-attribution-id"?: string;
    "data-sdk-integration-source"?: string;
    "data-user-id-token"?: string;
}

type ScriptOptions = PayPalScriptQueryParameters & PayPalScriptDataAttributes & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    "buyer-country"?: string;
    "client-id": string;
    commit?: boolean;
    components?: string;
    currency?: string;
    debug?: boolean | string;
    "disable-card"?: string;
    "disable-funding"?: string;
    "enable-funding"?: string;
    "integration-date"?: string;
    intent?: string;
    locale?: string;
    // loadScript() supports an array and will convert it
    // to the correct merchant-id and data-merchant-id string values
    "merchant-id"?: string[] | string;
    vault?: boolean | string;
    "data-client-token"?: string;
    "data-csp-nonce"?: string;
    "data-client-metadata-id"?: string;
    "data-merchant-id"?: string;
    "data-namespace"?: string;
    "data-page-type"?: string;
    "data-partner-attribution-id"?: string;
    "data-sdk-integration-source"?: string;
    "data-user-id-token"?: string;
    sdkBaseURL?: string;
}

type Style = {
    color?: "gold" | "blue" | "silver" | "white" | "black";
    height?: number;
    label?:
    | "paypal"
    | "checkout"
    | "buynow"
    | "pay"
    | "installment"
    | "subscribe"
    | "donate";
    layout?: "vertical" | "horizontal";
    shape?: "rect" | "pill";
    tagline?: boolean;
}



type IDonation = {
    config: ScriptOptions;
    loadScript?: () => Promise<typeof window.paypal>;
    checkout(style?: Style): Promise<void | typeof window.paypal | null>
}
