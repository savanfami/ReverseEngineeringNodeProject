import { join } from "path";


export const AUTH_FILE = join(__dirname, '../auth.json');
export const OUTPUT_FILE = join(__dirname, '../users.json');


export interface Auth{
    token:string;
}

export interface User{
    id:string;
    email:string;
}