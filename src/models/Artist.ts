import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, PrimaryColumn } from "typeorm"
import { User } from "./User"
import { Appointment } from "./Appointment"
import { Design } from "./Design"

@Entity("artists")
export class Artist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    first_name!: string;
  
    @Column()
    last_name?: string;
  
    @Column()
    phone_number!: string;
  
    @Column()
    tattoo_style!: string;
 
    @OneToOne(() => User, (user) => user.artist)
    @JoinColumn({ name: "user_id" })
    user!: User;
  

    @OneToMany(() => Appointment, (appointment) => appointment.artist)
    appointment!: Appointment;
  
   
    @OneToMany(() => Design, (design) => design.artist)
    design!: Design;

}
