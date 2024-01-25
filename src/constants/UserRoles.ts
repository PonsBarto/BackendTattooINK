import { Role } from "../models/Role";


export const UserRoles = {
   ADMIN: { id: 1, role_name: "costumer" } as Role,
   CLIENT: { id: 2, role_name: "artist" } as Role,
   ARTIST: { id: 3, role_name: "super_admin" } as Role,
};