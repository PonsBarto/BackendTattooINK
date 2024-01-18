import { Entity, BaseEntity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity("roles")
export class Role extends BaseEntity {
@PrimaryGeneratedColumn()
id!: number

@Column()
role_name!: string

@OneToMany(() => User, (user) => user.role)

user!: User[];

}
