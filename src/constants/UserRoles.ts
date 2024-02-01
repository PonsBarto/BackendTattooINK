import { Role } from "../models/Role";


export const UserRoles = {
   USER: { id: 1, role_name: "user" } as Role,
   ADMIN: { id: 2, role_name: "admin" } as Role,
   SUPER_ADMIN: { id: 3, role_name: "super_admin" } as Role,
};