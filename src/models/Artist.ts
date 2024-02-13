import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
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
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @OneToOne(() => User, (user) => user.artist)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => Design, (design) => design)
  design!: Design[];

  @OneToMany(() => Appointment, (appointment) => appointment.artist)
  artistAppointments!: Appointment[];
}
