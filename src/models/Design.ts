import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Artists } from "./Artist";

@Entity("designs")
export class Design extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  artist_id!: number;

  @Column()
  style!: string;

  @Column()
  picture!: string;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @ManyToOne(() => Artists, (artists) => artists.user)
  @JoinColumn({ name: "artist_id" })
  artist!: Artists;
}
