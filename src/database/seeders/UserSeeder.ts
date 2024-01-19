import { AppDataSource } from "../data-source";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";

export const userSeeder = ()=> {
 try {
       await AppDataSource.initialize();
   
       const users = UserFactory. create(10);
       console.log("Seeder users completado correctamente");
       

       await User.save (users);
    } catch (error) {
    }   finally {
    await AppDataSource.destroy();
 }
};