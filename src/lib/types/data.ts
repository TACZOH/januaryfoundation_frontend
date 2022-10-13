export type Data = {
	Organization: {
		OrganizationLegalName: string;
		Email: string;
		PhoneNumber: string;
		Website: string;
		tellUsAboutYourBusiness: string;
	};
	tellUsAboutYourBusiness: string;

	PhysicalLocation: {
		country: string;
		state: string;
	};
	FullName: string;
	Email: string;
	PhoneNumber: string;
	birthdate: string;
	idNumber: string;
	date: string;
	number: number;
	orderDetails: Record<string, never>;
	Address: {
		country: string;
		state: string;
	};
	body: string;
};
