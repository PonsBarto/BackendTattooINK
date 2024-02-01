import { roleSeeder } from "./RoleSeeder";
import { userSeeder } from "./UserSeeder";
import { artistSeeder } from "./ArtistSeeder";

(async () => {
  await roleSeeder();
  await userSeeder();
  await artistSeeder();
})();