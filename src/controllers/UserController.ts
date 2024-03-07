import { Request, Response } from "express";
import {
  CreateUserRequestBody,
  LoginUserRequestBody,
  TokenData,
} from "../types/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { AppDataSource } from "../database/data-source";
import { Artist } from "../models/Artist";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { UserRoles } from "../constants/UserRoles";

export class UserController {
  async register(
    req: Request<{}, {}, CreateUserRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const { name, last_name, address, email, phone_number, password } =
      req.body;

    const userRepository = AppDataSource.getRepository(User);

    try {
      const newUser = userRepository.create({
        name,
        last_name,
        address,
        email,
        phone_number,
        password: bcrypt.hashSync(password, 10),
        role: UserRoles.CUSTOMER,
      });

      await userRepository.save(newUser);
      res.status(StatusCodes.CREATED).json({
        message: "Register successfully",
      });
    } catch (error: any) {
      console.error("Error while register:", error);
      res.status(500).json({
        message: "Error while register",
        error: error.message,
      });
    }
  }

  async login(
    req: Request<{}, {}, LoginUserRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const { password, email } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    try {
      // Validar existencia de email y contraseña
      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Email or password is required",
        });
      }
      // Encontrar un usuario por email
      const user = await userRepository.findOne({
        where: {
          email: email,
        },
        relations: {
          role: true,
        },
        select: {
          role: {
            role_name: true,
          },
        },
      });

      // Verificar usuario inexistente
      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Bad email or password",
        });
      }

      // Verificar contraseña si el usuario existe
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      // Verificar contraseña valida
      if (!isPasswordValid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Bad email or password",
        });
      }

      // Generar token
      const userRole = user.role.role_name;

      const tokenPayload: TokenData = {
        userId: user.id?.toString() as string,
        userRoles: userRole as string,
      };

      const token = jwt.sign(tokenPayload, "123", {
        expiresIn: "3h",
      });

      res.status(StatusCodes.OK).json({
        message: "Login successfully",
        token,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error while login",
        error,
      });
    }
  }
  async getProfile(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({
        id: id,
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting user",
      });
    }
  }
  async update(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const data = req.body;

      const userRepository = AppDataSource.getRepository(User);
      await userRepository.update({ id: id }, data);

      res.status(202).json({
        message: "User updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while updating user",
      });
    }
  }

  async createArtist(
    req: Request<{}, {}>,
    res: Response
  ): Promise<void | Response<any>> {
    const { name, last_name, photo, address, email, phone_number, password } =
      req.body;
    const userRepository = AppDataSource.getRepository(User);
    try {
      // Crear nuevo usuario
      const dataUser: User = {
        name,
        last_name,
        address,
        email,
        photo,
        phone_number,
        password: bcrypt.hashSync(password, 10),
        role: UserRoles.ARTIST,
        created_at: new Date(),
        updated_at: new Date(),
        customerAppointments: [],
      };
      const newUser = await userRepository.save(dataUser);
      // Crear nuevo artista asociado al usuario
      const artistRepository = AppDataSource.getRepository(Artist);
      const newArtist = await artistRepository.save({
        user: newUser,
        portfolio: "https://", // Utiliza el valor proporcionado o un valor predeterminado
      });
      res.status(201).json(newArtist);
    } catch (error: any) {
      console.error("Error while creating artist:", error);
      res.status(500).json({
        message: "Error while creating artist",
        error: error.message,
      });
    }
  }
  async getAllArtists(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const artistRepository = AppDataSource.getRepository(Artist);

      const allArtists = await artistRepository.find({
        relations: ["user"],
      });

      const artistsWithDetails = allArtists.map((artist) => ({
        id: artist.id,
        name: artist.user.name,
        photo: artist.user.photo,
      }));

      res.status(200).json(artistsWithDetails);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting artist",
      });
    }
  }
  async getAllUsers(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const UserRepository = AppDataSource.getRepository(User);

      let { page, skip } = req.query;

      let currentPage = page ? +page : 1;
      let itemsPerPage = skip ? +skip : 10;

      const [allUsers, count] = await UserRepository.findAndCount({
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
        select: {
          id: true,
          name: true,
          last_name: true,
          phone_number: true,
          email: true,
        },
      });
      res.status(200).json({
        count,
        skip: itemsPerPage,
        page: currentPage,
        results: allUsers,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointments",
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const userRepository = AppDataSource.getRepository(User);
      await userRepository.delete({ id: id });

      res.status(200).json({
        message: "user deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while deleting user",
      });
    }
  }
}