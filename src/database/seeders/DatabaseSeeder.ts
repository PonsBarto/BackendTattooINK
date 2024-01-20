import { roleSeeder } from "./RoleSeeder";
import { userSeeder } from "./UserSeeder";


(async() => {
    await roleSeeder();
    await userSeeder();
   
})();