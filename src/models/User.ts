import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { Artists } from "./Artist";
import { Appointment } from "./Appointment";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  name?: string;

  @Column()
  surname?: string;

  @Column()
  photo?: string;

  @Column({select: false} )
    password!: string;

  @Column({ unique: true })
  email!: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: "users_roles",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
  })
  roles!: Role[];

  @OneToOne(() => Artists, (artists) => artists.user)
  artist?: Artists;

  @OneToMany(() => Appointment, (appointment) => appointment.user_id)
  clientAppointments?: Appointment[];
}
