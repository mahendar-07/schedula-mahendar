import { Role } from "src/users/entities/user.entity";

export class SignupDto{
    name:string;
    email:string;
    password:string;
    role: Role;
}