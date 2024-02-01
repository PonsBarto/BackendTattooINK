import { BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, Entity, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User";
import { Design } from "./Design";
import { Appointment } from "./Appointment";
import { UserRoles } from "../constants/UserRoles";


@Entity("artist")
export class Artists {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id!: number;

    @Column()
    portfolio?: string;

    @Column()
    create_at!: Date;

    @Column()
    updated_at!: Date;

    @OneToMany(() => Design, (design) => design)
    design!: Design[];

    @OneToMany(() => Appointment, (appointment) => appointment.artist)
    artistAppointments!: Appointment[];

    @OneToOne(() => User, (user) => user.artist)
    @JoinColumn({ name: "user_id" })
    user!: User;
}
