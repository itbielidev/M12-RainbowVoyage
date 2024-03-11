import z from "zod";

const registrationSchema = z.object({
    username: z.string().min(1).max(20),
    userTypes: z.enum(["employee", "technician"]),
    email: z.string().email(),
    surnames: z.string().min(1).max(50),
    alias: z.string().min(1).max(20),
    company_name: z.string().min(1).max(50),
    password: z.string().min(6).max(20)
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
});

const updateSchema = z.object({
    username: z.string().min(1).max(20),
    userTypes: z.enum(["employee", "technician"]),
    email: z.string().email(),
    surnames: z.string().min(1).max(50),
    alias: z.string().min(1).max(20),
    company_name: z.string().min(1).max(50),
})

export function validateRegister(input) {
    return registrationSchema.safeParse(input);
}

export function validateLogin(input) {
    return loginSchema.safeParse(input);
}

export function validateUpdate(input) {
    return updateSchema.safeParse(input);
}