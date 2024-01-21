import { Request, Response } from "express";
import { CreateClientRequestBody } from "../types.ts/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { AppDataSource } from "../database/data-source";
import { Role } from "../models/Role";

export class AuthController {

    async registerClient(
        req: Request<{}, {}, CreateClientRequestBody>,
        res: Response
     ): Promise<void | Response<any>> {
        const { username, password, email } = req.body;


        const userRepository = AppDataSource.getRepository(User);
        const roleRepository = AppDataSource.getRepository(Role);
        let rolesData = await roleRepository.find();

        try {
           
            const newUser = userRepository.create({
                username,
                email,
                password_hash: bcrypt.hashSync(password, 10),
                role: rolesData[2],
            });
            await userRepository.save(newUser);

            res.status(201).json(newUser);
          } catch (error: any) {
            console.error("Error while creating user:", error);
            res.status(500).json({
              message: "Error while creating user",
              error: error.message,
            });
          }

    }

    async registerArtist(
      req: Request<{}, {}, CreateClientRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { username, password, email } = req.body;


      const userRepository = AppDataSource.getRepository(User);
      const roleRepository = AppDataSource.getRepository(Role);
      let rolesData = await roleRepository.find();

      try {
         
          const newUser = userRepository.create({
              username,
              email,
              password_hash: bcrypt.hashSync(password, 10),
              role: rolesData[1],
          });
          await userRepository.save(newUser);

          res.status(201).json(newUser);
        } catch (error: any) {
          console.error("Error while creating user:", error);
          res.status(500).json({
            message: "Error while creating user",
            error: error.message,
          });
        }
  }

}