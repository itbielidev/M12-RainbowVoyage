export enum UserTypes {
    client,
    admin
}

export enum ExperienceTypes {
    gastronomic,
    cultural,
    festive
}

export type ReservationStates = 'completed' | 'cancelled' | 'pending';

export interface LoginPayLoad {
    email: string
    password: string
}

export interface RegisterPayLoad {
    name: string
    email: string
    lastName: string
    phone: string
    type: "admin" | "client"
    password: string
    passwordConfirm: string
    num_people_min?: number | null
    num_people_max?: number | null
    duration_min?: number | null
    duration_max?: number | null
    experience_type?: "gastronomic" | "cultural" | "festive" | "all" | "" | null
    checkbox: Boolean
    adult: Boolean
}


export interface TokenType {
    token: string
}

export interface UpdatePayload {
    name?: string
    email?: string
    last_name?: string
    phone?: string
    password?: string
    dni?: string
    address?: string
    city?: string
    num_people_min?: number
    num_people_max?: number
    duration_min?: number
    duration_max?: number
    experience_type?: ExperienceTypes
    price_min?: number
    price_max?: number
}

export interface Reservation {
    id: number
    experience_id: number
    experience?: Experience
    user?: User
    user_id: number
    date_creation: Date
    state: ReservationStates
    numPeople: number
    name: string
    last_name: string
    reservation_email: string
    phone: string
    dni: string
    address: string
    postalCode: string
    location: string
    dates: string
    airportIn: string
    airportOut: string
    partidaFirstDay: string
    llegadaFirstDay: string
    partidaLastDay: string
    llegadaLastDay: string
}

export interface ReservationPayload {
    name: string
    lastName: string
    email: string
    emailConfirmation: string
    phone: string
    dni: string
    address: string
    postalCode: string
    location: string
    checkbox: Boolean
    adult: Boolean
    numPeople: string
    dates: string
    dateId: string
    airportIn: string
    airportOut: string
    partidaFirstDay: string
    llegadaFirstDay: string
    partidaLastDay: string
    llegadaLastDay: string
    cardNumber: string
    securityCode: string
    cardExpirationDate: string
}
export interface User {
    id: number
    name: string
    last_name: string
    email: string
    phone?: string
    preference?: UserPreference
    reservations?: Reservation[]
}

export interface UserPreference {
    id: number
    price_min?: number
    price_max?: number
    type?: ExperienceTypes
    num_people_min?: number
    num_people_max?: number
    duration_min?: number
    duration_max?: number
    user?: User
}

// export interface Plan {
//     id: number
//     price: number
//     content: string
//     name: string
//     images: string[]
//     experience?: Experience
//     experience_id?: number
//     reservation?: Reservation
// }

export interface Experience {
    id: number
    city_id: number
    name: string
    city: City
    duration: number
    type: ExperienceTypes
    num_people: number
    descriptions: string[]
    days_descriptions: string[]
    images: string[]
    dates?: DateAvailability[]
    reservations?: Reservation[]
    price: number
}

export interface City {
    id: number
    name: string
    images: string[]
    description: string
    description_detail: string
    hovered?: boolean
    experiences?: Experience[]
    latitude: number
    longitude: number
}

export interface DateAvailability {
    id: number
    start_date: Date
    end_date: Date
    max_people: number
    current_people: number
    month: string
    year: string
    experience?: Experience
    experience_id?: number
}

export interface DatePayload {
    people: number
    month: string
    year: string
}

