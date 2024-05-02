import z from "zod";

const registrationSchema = z.object({
    name: z.string().min(1).max(100),
    type: z.enum(["client", "admin"]),
    email: z.string().email().max(255),
    lastName: z.string().min(1).max(100),
    phone: z.string().max(9),
    password: z.string().min(6).max(20),
    passwordConfirm: z.string().min(6).max(20),
    num_people_min: z.number().optional().nullable(),
    num_people_max: z.number().optional().nullable(),
    duration_min: z.number().optional().nullable(),
    duration_max: z.number().optional().nullable(),
    experience_type: z.enum(["gastronomic", "cultural", "festive", "all"]).optional().nullable(),
    checkbox: z.boolean(),
    adult: z.boolean()
});

const loginSchema = z.object({
    email: z.string().email().max(255),
    password: z.string().min(6).max(20),
});

const updateSchema = z.object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().email().max(255).optional(),
    last_name: z.string().min(1).max(100).optional(),
    dni: z.string().max(9).optional(),
    address: z.string().min(1).optional(),
    city: z.string().min(1).optional(),
    phone: z.string().max(9).optional(),
    password: z.string().min(6).max(20),
    num_people_min: z.number().optional().nullable(),
    max_people_max: z.number().optional().nullable(),
    duration_min: z.number().optional().nullable(),
    duration_max: z.number().optional().nullable(),
    experience_type: z.enum(["gastronomic", "cultural", "festive", "all"]).optional().nullable(),
    price_min: z.number().optional().nullable(),
    price_max: z.number().optional().nullable()
})

const updatePreferencesSchema = z.object({
    num_people_min: z.number().optional().nullable(),
    max_people_max: z.number().optional().nullable(),
    duration_min: z.number().optional().nullable(),
    duration_max: z.number().optional().nullable(),
    experience_type: z.enum(["gastronomic", "cultural", "festive", "all"]).optional().nullable(),
    price_min: z.number().optional().nullable(),
    price_max: z.number().optional().nullable()
})


const userDataSchema = z.object({
    name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100),
    phone: z.string().min(9).max(9)
})


const updateEmailSchema = z.object({
    email: z.string().email().max(255),
    confirmEmail: z.string().email().max(255)
})


const updatePasswordSchema = z.object({
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20)
})

export function validateUserPreferences(input) {
    return updatePreferencesSchema.safeParse(input);

}

export function validateRegister(input) {
    return registrationSchema.safeParse(input);
}

export function validateLogin(input) {
    return loginSchema.safeParse(input);
}

export function validateUpdate(input) {
    return updateSchema.safeParse(input);
}


export function validateUserData(input) {
    return userDataSchema.safeParse(input)
}

export function validateUpdateEmailData(input) {
    return updateEmailSchema.safeParse(input)
}

export function validateUpdatePasswordData(input) {
    return updatePasswordSchema.safeParse(input)
}