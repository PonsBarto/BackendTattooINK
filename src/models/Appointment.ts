import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Artists } from "./Artist";

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  user_id!: number;

  @Column()
  artist_id!: number;

  @Column()
  date!: Date;

  @Column()
  hour!: string;

  @Column()
  created_at?: Date;

  @Column()
  updated_at?: Date;

  @ManyToOne(() => User, (user) => user.roles)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user?: User;

  @ManyToOne(() => Artists, (artist) => artist.users)
  @JoinColumn({ name: "artist_id", referencedColumnName: "id" })
  artist?: Artists;
}
