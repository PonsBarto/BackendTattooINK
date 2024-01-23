import { Request, Response } from "express";
import { CreateClientRequestBody } from "../types.ts/types";
import { CreateArtistRequestBody } from "../types.ts/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { AppDataSource } from "../database/data-source";
import { Role } from "../models/Role";
import { Artist } from "../models/Artist";
import { Client } from "../models/Client";

export class AuthController {

    async registerClient(
        req: Request<{}, {}, CreateClientRequestBody>,
        res: Response
     ): Promise<void | Response<any>> {
        const { username, password, email, first_name, last_name, date_of_birth, address,phone_number, gender, nationality } = req.body;


        const userRepository = AppDataSource.getRepository(User);
        const roleRepository = AppDataSource.getRepository(Role);
        const ClientRepository = AppDataSource.getRepository(Client);
        let rolesData = await roleRepository.find();

        try {
           
            const newUser = userRepository.create({
                username,
                email,
                password_hash: bcrypt.hashSync(password, 10),
                role: rolesData[2],
            });
            await userRepository.save(newUser);

            const newClient = ClientRepository.create({
              user: newUser,
              first_name,
              phone_number,
            });
            await ClientRepository.save(newClient);

            res.status(201).json(newClient);
          } catch (error: any) {
            console.error("Error while creating user:", error);
            res.status(500).json({
              message: "Error while creating user",
              error: error.message,
            });
          }

    }

    async registerArtist(
      req: Request<{}, {}, CreateArtistRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { username, password, email, first_name, phone_number, tattoo_style, user_id } = req.body;


      const userRepository = AppDataSource.getRepository(User);
      const artistRepository = AppDataSource.getRepository(Artist);
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

          const newArtist = artistRepository.create({
            user: newUser, first_name, phone_number, tattoo_style
          });
          await artistRepository.save(newArtist);

          res.status(201).json(newArtist);
        } catch (error: any) {
          console.error("Error while creating user:", error);
          res.status(500).json({
            message: "Error while creating user",
            error: error.message,
          });
        }
  }

}