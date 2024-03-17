import z from "zod";

const reservationSchema = z.object({
    date_creation: z.date(),
    state: z.enum(["completed", "cancelled", "pending"]),
    num_people: z.number(),
    plan_price: z.number(),
    plan_name: z.string().min(1),
    start_date: z.date(),
    end_date: z.date(),
    user_name: z.string().min(1).max(100),
    user_email: z.string().email().max(255),
    user_dni: z.string().max(9),
    user_phone: z.string().max(9)
});


export function validateReservation(input) {
    return reservationSchema.safeParse(input);
}

