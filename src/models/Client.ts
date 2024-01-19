import { Entity, OneToMany, Column, OneToOne, PrimaryGeneratedColumn,JoinColumn, BaseEntity } from "typeorm"
import { Role } from "./Role"
import { User } from "./User"
import { Appointment } from "./Appointment"


@Entity("clients")
export class Client extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    first_name!: string

    @Column()
    last_name!: string

    @Column({unique: true})
    phone_number!: string

    @OneToOne(() => User, (user) => user.client)
    @JoinColumn({name: "user_id"})
    user!: User;

    @OneToMany(() => Appointment, (appointment) => appointment.client)
    appointment!: Appointment;

}
