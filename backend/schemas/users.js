import z from "zod";

const registrationSchema = z.object({
    name: z.string().min(1).max(100),
    type: z.enum(["client", "admin"]),
    email: z.string().email().max(255),
    last_name: z.string().min(1).max(100),
    phone: z.string().max(9),
    password: z.string().min(6).max(20),
    num_people_min: z.number().optional(),
    num_people_max: z.number().optional(),
    duration_min: z.number().optional(),
    duration_max: z.number().optional(),
    experience_type: z.enum(["gastronomic", "cultural", "festive"]).optional()
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
    password: z.string().min(6).max(20).optional(),
    num_people_min: z.number().optional().optional(),
    max_people_max: z.number().optional(),
    duration_min: z.number().optional(),
    duration_max: z.number().optional(),
    experience_type: z.enum(["gastronomic", "cultural", "festive"]).optional(),
    price_min : z.number().optional(),
    price_max: z.number().optional()
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