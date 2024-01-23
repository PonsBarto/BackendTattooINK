import { AppDataSource } from "../data-source";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { Role } from "../../models/Role";
import { UserRoles } from "../../constants/UserRoles";


export const userSeeder = async ()=> {
 try {
       await AppDataSource.initialize();
   
       const count = 20;
       

       await seedUsersWithRoles({
        roles: [UserRoles.ADMIN],
        count: count,
     });

     
     console.log("Seeding users successfully completed");
  } catch (error) {
     console.error("Error seeding the database:", error);
  } finally {
     
     await AppDataSource.destroy();
  }
};

export const seedUsersWithRoles = async ({
  roles,
  count,
}: {
  roles: Role[] ;
  count: number;
}) => {

  console.log(roles);
  
  const userRepository = AppDataSource.getRepository(User);
  const userFactory = new UserFactory(userRepository);

  const roleRepository = AppDataSource.getRepository(Role);
  let rolesData = await roleRepository.find();


  const users = userFactory.createMany(count);

  users.forEach((user) => {
     user.role = rolesData[0];
  });
 

  
  await userRepository.save(users);

  return users;
};
