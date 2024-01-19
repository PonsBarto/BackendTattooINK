import { Entity, Column, BaseEntity, OneToOne, ManyToOne, PrimaryGeneratedColumn,JoinColumn } from "typeorm"
import { Role } from "./Role"
import { Client } from "./Client"
import { Artist } from "./Artist"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ unique: true })
    username!: string

    @Column()
    password_hash!: string

    @Column({unique: true})
    email!: string

    @ManyToOne(() => Role, (role) => role.user)
    @JoinColumn ({name: "role"}) 
    role!: Role;
 
   @OneToOne(() => Client, (client) => client.user)
   client?: Client;
 
    @OneToOne(() => Artist, (artist) => artist.user)
    artist?: Artist;

}
