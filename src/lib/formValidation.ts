import { Regex } from '$lib/regex';
import { name, email, phone, age, ID, website } from "$lib/stores";


export const validInput = (value: string, check: "name" | "email" | "phone" | "ID" | "date" | "age" | "website") => {
    const regex = new Regex(value)

    function validateAge() {
        const birthDate = new Date(value);
        const today = new Date();
        let currentAge = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            currentAge--;
        }
        if (currentAge < 18) {
            age.set(false);
            return false;
        } else {
            age.set(true);
            return true
        };
    }

    switch (check) {
        case "name":
            name.set(regex.try.name());
            return regex.try.name();
        case "email":
            email.set(regex.try.email());
            return regex.try.email();
        case "phone":
            phone.set(regex.try.phone());
            return regex.try.phone();
        case "ID":
            ID.set(regex.try.ID());
            return regex.try.ID();
        case "date":
            return regex.try.date();
        case "age":
            return validateAge();
        case "website":
            website.set(regex.try.website());
            return regex.try.website();
    }
}

export const validate: Validate = {

    name: (value: string): boolean => {
        return validInput(value, "name");
    },
    email: (value: string): boolean => {
        return validInput(value, "email");
    },
    phone: (value: string): boolean => {
        return validInput(value, "phone");
    },
    ID: (value: string): boolean => {
        return validInput(value, "ID");
    },
    date: (value: string): boolean => {
        return validInput(value, "date");
    },
    age: (value: string): boolean => {
        return validInput(value, "age");
    },
    website: (value: string): boolean => {
        return validInput(value, "website");
    }
};

type Validate = {
    name: (value: string) => boolean;
    email: (value: string) => boolean;
    phone: (value: string) => boolean;
    ID: (value: string) => boolean;
    date: (value: string) => boolean;
    age: (value: string) => boolean;
    website: (value: string) => boolean;
}
