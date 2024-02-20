import { faker } from "@faker-js/faker";
import { User } from "../../models/User";
import { Role } from "../../models/Role";
import bcrypt from "bcrypt";
import { BaseFactory } from "./BaseFactory";
import { UserRoles } from "../../constants/UserRoles";

export class UserFactory extends BaseFactory<User> {
  static createMany(artistCount: number, arg1: { roles: Role[] }) {
    throw new Error("Method not implemented.");
  }
  protected generateSpecifics(user: User): User {
    user.username = faker.internet.userName();
    user.name = faker.person.firstName();
    user.surname = faker.person.lastName();
    user.password = bcrypt.hashSync("12345678", 10);
    user.photo = faker.image.avatar();
    user.email = faker.internet.email({
      allowSpecialCharacters: true,
    });

    return user;
  }
}
