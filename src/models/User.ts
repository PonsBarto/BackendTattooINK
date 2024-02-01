import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { Artist } from "./Artist";
import { Appointment } from "./Appointment";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique: true})
    name!: string;

    @Column()
    surname!: string;

    @Column()
    photo?: string;

    @Column()
    email!: string;

    @Column()
    password_hash!: string;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinTable ({
        name: "role_id",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id",
         },
         inverseJoinColumn: {
            name: "role_id",
            referencedColumnName: "id",
         },})
  
    roles!: Role[];
    
    @OneToOne(() => Artist, (artists) => artists.user)
    artist?: Artist;
    
    @OneToMany(() => Appointment, (appointment) => appointment.user_id)
    customerAppointments!: Appointment[];
}