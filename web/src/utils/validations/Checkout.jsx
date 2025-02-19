import * as Yup from 'yup'

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/

export const checkoutValidation = Yup.object({
    name: Yup.string()
        .required("Name is required")
        .min(2, "Minimum 2 characters are required")
        .max(50, "Maximum 50 characters are required"),
    email: Yup.string()
        .matches(emailRegex, "Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .matches(/[a-z]/, "Password must contain at least one lowercase character")
        .matches(/[A-Z]/, "Password must contain at least one uppercase character")
        .matches(/[@#$%_+.]/, "Password must contain at least one special character")
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    contact: Yup.string()
        .required("Contact number is required"),
    picture: Yup.string()
        .required("Picture is required"),
    billingAddress: Yup.object({
        street: Yup.string()
            .required("Street address is required")
            .min(2, "Minimum 2 characters are required")
            .max(50, "Maximum 50 characters are allowed"),
        city: Yup.string()
            .required("City is required"),
        state: Yup.string()
            .required("State is required"),
        postalCode: Yup.string()
            .required("Postal code is required")
    }),
    cardNumber: Yup.string()
        .required("Card number is required")
        .matches(/^\d{16}$/, "Card number must be 16 digits"),
    monthYear: Yup.string()
        .required("Expiry date is required")
        .matches(/^(0[1-9]|1[0-2])\/([0-9]{4})$/, "Invalid expiry date format (MM/YYYY)"),
    cvv: Yup.string()
        .required("CVV is required")
        .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
})