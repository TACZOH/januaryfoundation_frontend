export const config = {
	SITE_URL: String(import.meta.env.VITE_SITE_URL),
	ENDPOINT_URL: String(import.meta.env.VITE_ENDPOINT_URL),
	PROJECT_ID: String(import.meta.env.VITE_PROJECT_ID),
	LOCALE: String(import.meta.env.VITE_LOCALE),
	CLIENT: String(import.meta.env.VITE_CLIENT),
	MERCHANT: String(import.meta.env.VITE_MERCHANT)
};
