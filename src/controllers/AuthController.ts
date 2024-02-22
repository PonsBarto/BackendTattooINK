/*
-Este AuthController que contiene dos métodos asincrónicos, register y login. Sirve para 
manejar el registro y la autenticación de usuarios.
*/
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
/*
-Este metodo resiter es para registrar un nuevo usuario.

-Recibe un objeto Request que contiene los datos del cuerpo de la solicitud 
(CreateUserRequestBody), incluyendo username, name, surname, password, y email, y un objeto 
Response para enviar la respuesta al cliente.

-Extrae los datos del cuerpo de la solicitud.

-Obtiene el repositorio de usuarios mediante AppDataSource.getRepository(User).
-Crea un nuevo objeto de usuario con los datos proporcionados, incluyendo el hash de la contraseña 
utilizando bcrypt.hashSync.

-Guarda el nuevo usuario en la DB.

-Envía una respuesta con el código de estado HTTP CREATED (201) y un mensaje indicando 
que el registro fue exitoso.

-Captura y maneja errores que puedan ocurrir durante el proceso, enviando un mensaje de error 
y un código de estado HTTP INTERNAL_SERVER_ERROR (500) en caso de fallo.
*/
  async register(
    req: Request<{}, {}, CreateUserRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const { username, name, surname, password, email } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const artistRepository = AppDataSource.getRepository(Artists);

    try {
      const newUser: User = {
        username,
        name,
        surname,
        email,
        password: bcrypt.hashSync(password, 10),
        roles: [UserRoles.USER],
      };
      await userRepository.save(newUser);

      res.status(StatusCodes.CREATED).json({
        message: "Register successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error while register",
        error: error.message,
      });
    }
  }

/*
-El metodo login sirve para la Autentificacion de un usuario.

-Similar al método register, recibe un objeto Request con los datos del cuerpo de la solicitud 
(LoginUserRequestBody), incluyendo email y password, y un objeto Response.

-Verifica que tanto el email como la contraseña hayan sido proporcionados.

-Busca en la base de datos un usuario que coincida con el email proporcionado.

-Si no encuentra un usuario o si la contraseña no es válida (comparando la contraseña proporcionada
con el hash almacenado usando bcrypt.compareSync), devuelve un error con el código de estado 
BAD_REQUEST (400) y un mensaje indicando que el email o la contraseña son incorrectos.

-Si la autenticación es exitosa, genera un token JWT (jwt.sign) con la información del usuario 
(payload), incluyendo email, ID del usuario, y roles, y lo envía en la respuesta junto con un 
mensaje de éxito y el código de estado OK (200).

-Maneja posibles errores durante el proceso, enviando un mensaje de error y un código de estado 
INTERNAL_SERVER_ERROR (500) en caso de fallo.
*/
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

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Bad email or password",
        });
      }

      const roles = user.roles.map((role) => role.role_name);

      const tokenPayload: TokenData = {
        email: user.email,
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