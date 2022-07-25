export type AuthCredentials = {
	identifier: string;
	password: string;
};

export type NewCredentials = {
	username: string;
	email: string;
	password: string;
};

export type User = {
	username?: string;
	email: string;
	confirmed: boolean;
	blocked: boolean;
	[key: string]: any;
};

export type HGF = {
	date: string;
	number: number;
	body?: string | null;
	institution?: any;
};

export type RT = {
	date: string;
	number: number;
	body?: string | null;
	buyer?: User;
};
