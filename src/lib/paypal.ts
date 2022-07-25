import { loadScript as ppScript } from "@paypal/paypal-js";
import type { OnApproveData, OrderResponseBody } from "@paypal/paypal-js";
import type {
	IBusinessApplication,
	IIndividualApplication,
	IInstitutionApplication,
	INominationApplication,
	IRaffleTicket,
} from "$lib/types";
import { Form } from "$lib/form";
import type { FormType } from "$lib/types";
import { fee } from "$lib/fees";
import { paymentModal, paymentStatus } from "$lib/stores";

export class PayPal extends Form implements Paypal {
	public declare type: FormType;
	public config!: ScriptOptions;
	private _script!: typeof window.paypal;
	private _fee!: number;
	public container: string | HTMLElement;
	private _response: unknown;
	public customFee?: number;

	public get response(): unknown {
		return this._response;
	}
	public set response(value: unknown) {
		this._response = value;
	}

	public get fee(): number {
		return this._fee;
	}

	private set fee(value: number) {
		this._fee = value;
	}

	public get script() {
		return this._script;
	}
	private set script(value) {
		this._script = value;
	}

	public constructor(
		type: FormType,
		config: ScriptOptions,
		container: string | HTMLElement,
		customFee?: number
	) {
		super(type);
		this.config = config;
		this.container = container;
		this.customFee = customFee;
	}

	public getConfig(): boolean {
		return this.config !== undefined;
	}

	public async loadScript(): Promise<typeof window.paypal> {
		this.fee = typeof this.customFee === "number" ? this.customFee : fee(this.type);
		try {
			return this.getConfig() ? (this.script = await ppScript(this.config)) : undefined;
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
		// ticket: IIndividualApplication | IBusinessApplication | IInstitutionApplication | INominationApplication | IRaffleTicket,
		// container: string | HTMLElement,
		// container: string | HTMLElement = this.defaultContainer,
		style?: Style
	) {
		const post = async (
			data: unknown,
			order: unknown,
			requestData:
				| IIndividualApplication
				| IBusinessApplication
				| IInstitutionApplication
				| INominationApplication
				| IRaffleTicket
		) => {
			return await this.submit(data, order, requestData);
		};
		const amount = this.fee;
		// const container = this.container;
		try {
			return this.script == undefined
				? await this.loadScript()
				: // @ts-expect-error Buttons only undefined when not used
				  await this.script
						.Buttons({
							style: style,
							createOrder: function (data, actions) {
								// Set up the transaction
								return actions.order.create({
									purchase_units: [
										{
											amount: {
												currency_code: "USD",
												value: `${amount}`,
											},
										},
									],
								});
							},
							onApprove: async function (data, actions) {
								// actions.redirect("/thanks");
								if (typeof actions.order !== "undefined") {
									actions.order.capture().then(async details => {
										// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
										await post(data, details, JSON.parse(localStorage.getItem("data")!)).then(
											() => {
												paymentStatus.set(false);
												paymentModal.set(true);
												return;
											}
										);
										// setTimeout(() => {
											// paymentModal.set(true), 3 * 1000;
											// if ( typeof container === "string") {
											//     const element = document.getElementById(container)
											//     if (element !== null) {
											//         const buttons = element.NODE
											//         buttons.removeChild(buttons);
											//     }
											// }
										// });
									});
								}
							},
							onError: function (err) {
								// Log error if something goes wrong during approval
								paymentStatus.set(true);
								setTimeout(() => paymentModal.set(true), 3 * 1000);
								if (err instanceof Error) {
									console.error("Something went wrong", err);
									throw new Error(`Error: ${err.name}. ${err.message}`);
								}
							},
						})
						.render(this.container)
						.catch(error => {
							console.error("Failed to load the PayPal JS SDK script", error);
						});
		} catch (error) {
			if (error instanceof Error) {
				console.error(`Error: ${error.name}. ${error.message}`, error);
				throw new Error(`Error: ${error.name}. ${error.message}`);
			}
		}
	}

	// public createElement(element: string, attribute?: { name: string; value: string }): HTMLElement {
	//     const doc: Document = document as Document;
	//     const HTMLElement = doc.createElement(element);
	//     attribute !== undefined ? HTMLElement.setAttribute(attribute.name, attribute.value) : attribute = undefined;
	//     return HTMLElement;
	// }

	// public defaultContainer: HTMLElement = this.createElement('div', { name: "id", value: "#paypal-buttons" });
}

let OrderResponseBody: OrderResponseBodyCustom;

type OrderResponseBodyCustom = {
	data?: OnApproveData;
	order: OrderResponseBody;
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
};

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
};

type ScriptOptions = PayPalScriptQueryParameters &
	PayPalScriptDataAttributes & {
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
	};

type Style = {
	color?: "gold" | "blue" | "silver" | "white" | "black";
	height?: number;
	label?: "paypal" | "checkout" | "buynow" | "pay" | "installment" | "subscribe" | "donate";
	layout?: "vertical" | "horizontal";
	shape?: "rect" | "pill";
	tagline?: boolean;
};

type Paypal = {
	config: ScriptOptions;
	loadScript?: () => Promise<typeof window.paypal>;
	createOrder?: <T>(args: unknown) => T;
};
