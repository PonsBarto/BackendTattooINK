import { Request, Response } from "express";
import { CreateClientRequestBody } from "../types.ts/types";
import { CreateArtistRequestBody } from "../types.ts/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database/data-source";
import { Role } from "../models/Role";
import { Artist } from "../models/Artist";
import { Client } from "../models/Client";
import { StatusCodes } from "http-status-codes";



export class AuthController {
  async registerClient(
    req: Request<{}, {}, CreateClientRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const {
      username,
      password,
      email,
      first_name,
      last_name,
      date_of_birth,
      address,
      phone_number,
      gender,
      nationality,
    } = req.body;

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
    const {
      username,
      password,
      email,
      first_name,
      phone_number,
      tattoo_style,
      user_id,
    } = req.body;

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
        user: newUser,
        first_name,
        phone_number,
        tattoo_style,
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

  async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = bcrypt.compareSync(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user.id }, "YourSecretKey", { expiresIn: "1h" });

    return res.status(200).json({ message: "Successful login", token });
  }

  async getUserProfile(req: Request, res: Response): Promise<Response> {
    const userId = parseInt(req.params.userId);

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  }

  async updateUserProfile(req: Request, res: Response): Promise<Response> {
    const userId = parseInt(req.params.userId);
    const updateData = req.body;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.update(userId, updateData);

    const updatedUser = await userRepository.findOneBy({ id: userId });

    return res.status(200).json(updatedUser);
  }
  async changePassword(req: Request, res: Response): Promise<Response> {
    if (!req.user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No autenticado" });
    }

    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const validPassword = bcrypt.compareSync(currentPassword, user.password_hash);
    if (!validPassword) {
        return res.status(401).json({ message: "Contraseña actual incorrecta" });
    }

    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
    await userRepository.update(userId, { password_hash: hashedNewPassword });

    return res.status(200).json({ message: "Contraseña actualizada con éxito" });
}
}
