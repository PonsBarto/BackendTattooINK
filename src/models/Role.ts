import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { User } from "./User";

@Entity("roles")
export class Role {

    @PrimaryGeneratedColumn()
    id!: number; 

    @Column()
    role_name!: string;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;

}