import { JwtPayload } from "jwt-decode";

export interface IItem {
    id: string;
    title: string;
    description: string;
    author: string;
    publisher: string;
    imageUrl: string;
}

export interface IKullanici {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    imageUrl: string;
    bio: string;
}

export interface MyJwt extends JwtPayload {
    resource_access:Record<string,string>
}