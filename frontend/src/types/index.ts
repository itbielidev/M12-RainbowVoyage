export interface LoginPayLoad {
    username : string
    password : string
}

export interface RegisterPayLoad {
    userType : string
    email : string
    name : string
    surnames: string
    alias: string
    company_name: string
    password: string
}

enum UserTypes {
    employee,
    technician
}

export interface User {
    id : number
    alias : string
    email : string
    type : UserTypes
}

export interface Category {
    id : number
    name : string
    courses ?: Course[]
}

export interface Course {
    id : number
    name: string
    main_text: string
    form_id: number
    form: any
    categories ?: Category[]
}

export interface Form {
    id: number
    name: string
    correct_combination : number[]
    users : User[]
}