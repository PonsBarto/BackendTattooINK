import { Entity, BaseEntity, Column, ManyToOne,PrimaryGeneratedColumn, JoinColumn } from "typeorm"
import { Client } from "./Client"
import { Artist } from "./Artist"

@Entity("appointments")
export class Appointment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    appointment_date!: Date

    @Column()
    shift!: string
 
    @ManyToOne(() => Client, (client) => client.appointment)
    @JoinColumn({name: "client_id"})
    client!: Client;


     @ManyToOne(() => Artist, (artist) => artist.appointment)
     @JoinColumn ({name: "artist_id"})
     artist!: Artist;

}
