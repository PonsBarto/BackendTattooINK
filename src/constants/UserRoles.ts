import { Role } from "../models/Role";


export const UserRoles = {
   ADMIN: { id: 1, role_name: "admin" } as Role,
   CLIENT: { id: 2, role_name: "client" } as Role,
   ARTIST: { id: 3, role_name: "artist" } as Role,
};