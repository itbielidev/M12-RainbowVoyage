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
    alias : string,
    email : string,
    type : UserTypes
}