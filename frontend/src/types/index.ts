export enum UserTypes {
    client,
    admin
}

export enum ExperienceTypes {
    gastronomic,
    cultural,
    festive
}

export enum ReservationStates {
    completed,
    cancelled,
    pending
}

export interface LoginPayLoad {
    email : string
    password : string
}

export interface RegisterPayLoad {
    name : string
    email : string
    lastName : string
    phone: string
    type: "admin" | "client"
    password: string
    passwordConfirm: string
    num_people_min?: number | null
    num_people_max?: number | null
    duration_min?: number | null
    duration_max?: number | null
    experience_type?: "gastronomic" | "cultural" | "festive" | "" | null
    checkbox : Boolean
}


export interface TokenType {
    token: string
}

export interface UpdatePayload {
    name ?: string
    email ?: string
    last_name ?: string
    phone?: string
    password?: string
    dni?: string
    address?: string
    city ?: string
    num_people_min?: number
    num_people_max?: number
    duration_min?: number
    duration_max?: number
    experience_type?: ExperienceTypes
    price_min?: number
    price_max?:number
}

export interface Reservation {
    id : number
    plan_id: Number
    plan?:Plan
    user?:User
    user_id: number
    date_creation: Date
    state: ReservationStates
    num_people:number
}

export interface User {
    id : number
    name: string
    last_name: string
    email: string
    dni?: string
    address?: string
    city?: string
    phone?: string
    preference?: UserPreference
    reservations?: Reservation[]
}

export interface UserPreference {
    id:number
    price_min?: number
    price_max?: number
    type?: ExperienceTypes
    num_people_min?: number
    num_people_max?: number
    duration_min?:number
    duration_max?:number
    user?: User
}

export interface Plan {
    id: number
    price: number
    content: string
    name: string
    images: string[]
    experience?: Experience
    experience_id?: number
    reservation?: Reservation
}

export interface Experience {
    id: number
    city_id: number
    city: City
    duration: number
    type: ExperienceTypes
    num_people: number
    descriptions: string[]
    days_descriptions: string[]
    images: string[]
    plans?: Plan[]
}

export interface City {
    id:number
    name: string
    images: string[]
    experiences? : Experience[]
}

export interface DateAvailability {
    id:number
    start_date: Date
    end_date: Date
    max_people: number
    current_people: number
    month: string
    year: string
    plan?: Plan
    plan_id?: number
}


