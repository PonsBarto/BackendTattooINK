import { Request, Response } from "express";
import {
  CreateUserRequestBody,
  LoginUserRequestBody,
  TokenData,
} from "../types/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import { AppDataSource } from "../database/data-source";
import { Artists } from "../models/Artist";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export class AuthController {
  async register(
    req: Request<{}, {}, CreateUserRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const { username, name, surname, password_hash, email } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const artistRepository = AppDataSource.getRepository(Artists);

    try {
      const newUser: User = {
        username,
        name,
        surname,
        email,
        password_hash: bcrypt.hashSync(password_hash, 10),
        roles: [UserRoles.USER],
      };
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
      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Email or password is required",
        });
      }

      const user = await userRepository.findOne({
        where: {
          email: email,
        },
        relations: {
          roles: true,
        },
        select: {
          roles: {
            role_name: true,
          },
        },
      });

      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Bad email or password",
        });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password_hash);

      if (!isPasswordValid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Bad email or password",
        });
      }

      const roles = user.roles.map((role) => role.role_name);

      const tokenPayload: TokenData = {
        userId: user.id?.toString() as string,
        userRoles: roles,
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
}
