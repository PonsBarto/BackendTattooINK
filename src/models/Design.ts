import { Entity, BaseEntity, Column, JoinColumn, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Artist } from "./Artist"

@Entity("designs")
export class Design extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    design_number!: string

    @Column()
    image!: string

    @ManyToOne (()=> Artist, (artist)=> artist.design)
    @JoinColumn ({name: "artist_id"})
    artist!: Artist;

}
