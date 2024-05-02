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

const reservationPayLoadSchema = z.object({
    name: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    email: z.string().email().max(255),
    emailConfirmation: z.string().email().max(255),
    numPeople: z.string(),
    phone: z.string().max(9),
    dni: z.string().max(9),
    address: z.string().min(1).max(200),
    postalCode: z.string().max(5),
    location: z.string().min(1).max(200),
    numPeople: z.string(),
    checkbox: z.boolean(),
    adult: z.boolean(),
    dates: z.string(),
    dateId: z.string(),
    airportIn: z.string(),
    airportOut: z.string(),
    partidaFirstDay: z.string(),
    llegadaFirstDay: z.string(),
    partidaLastDay: z.string(),
    llegadaLastDay: z.string(),
    cardNumber: z.string(),
    cardExpirationDate: z.string(),
    securityCode: z.string()
});


export function validateReservation(input) {
    return reservationPayLoadSchema.safeParse(input);
}

