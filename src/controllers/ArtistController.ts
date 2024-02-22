//-Controlador para gestionar el CRUD de artistas.

import { Controller } from "./Controller";
import { Request, Response } from "express";
import { User } from "../models/User";
import { AppDataSource } from "../database/data-source";
import { Artists } from "../models/Artist";
import { UserRoles } from "../constants/UserRoles";
import {
  CreateUserRequestBody,
  CreateArtistRequestBody,
  TokenData,
} from "../types/types";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { isAdmin } from "../middlewares/isAdmin";
import { Role } from "../models/Role";
import { Admin } from "typeorm";

export class ArtistController implements Controller {
/*
-El metodo getAll Recupera y devuelve todos los artistas almacenados en la DB
-Utiliza el metodo find para obtener todos los registros, incluyendo la relacion con el usuario,
posteriormente mapea los resultados para crear un nuevo array que contiene solo los datos necesarios del
artista, devuelve el array como una respuesta con estado 500.
*/
  async getAll(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const artistRepository = AppDataSource.getRepository(Artists);

      const allArtists = await artistRepository.find({
        relations: ["user"],
      });

      const userArtistIds = allArtists.map((artist) => {
        return {
          id: artist.id,
          name: artist.user.name,
          surname: artist.user.surname,
          photo: artist.user.photo,
          email: artist.user.email,
        };
      });

      res.status(200).json({ userArtistIds });
    } catch (error) {
      res.status(500).json({
        message: "Error while getting artist",
      });
    }
  }
/*
-El metodo getById  Obtiene y devuelve un artista especifico por su ID 
-Recupera el ID de los parametros del artista solicitado, busca al artista en DB y devuelve 
el artista encontrado con un metodo JSON con estado 200, y en el caso de no encontrar al artista
devuelve una respuesta con codigo de error HTTP 404. Si la sonsulta fuese erronia, devuelve un
estado 500.
*/
  async getById(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const artistRepository = AppDataSource.getRepository(Artists);
      const artist = await artistRepository.findOneBy({
        id: id,
      });

      if (!artist) {
        return res.status(404).json({
          message: "Artist not found",
        });
      }

      res.status(200).json(artist);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting artist",
      });
    }
  }

/*
-El metodo create crea un nuevo artista en DB.
-Extrae los datos necesarios del cuerpo de la solicitud, crea un nuevo usuario con esos datos  
y lo guarda en DB. Si el nuevo usuario tiene el rol de ADMIN, tambien crea y guarda un nuevo 
artista asociado a ese nuevo usuario. 
-Devuelve una respuesta status HTTP 201 indicando que el artista fu creado con exito y un
500 en caso de error.
*/
  async create(
    req: Request<{}, {}, CreateArtistRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const { username, name, surname, password, email } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    try {
      const newUser: User = {
        username,
        name,
        surname,
        email,
        password: bcrypt.hashSync(password, 10),
        roles: [UserRoles.ADMIN],
      };
      await userRepository.save(newUser);

      if (newUser.roles.includes(UserRoles.ADMIN)) {
        const artistRepository = AppDataSource.getRepository(Artists);
        const newArtist = artistRepository.create({
          user_id: newUser.id,
          portfolio: req.body.portfolio || "",
        });

        await artistRepository.save(newArtist);
      }

      res.status(201).json("Artist create successfully");
    } catch (error: any) {
      console.error("Error while creating artist:", error);
      res.status(500).json({
        message: "Error while creating artis",
        error: error.message,
      });
    }
  }

/*
-Este metodo update se encarga de actualizar los datos de un artista espcifico. 
-Se encarga de buscar el usuario basandose en su ID obteniendo los datos del token. 
Si el usuario o artista no existe lanza un error. 
Actualiza el portfolio del artista con los datos proporcionados y devuelve una respuesta de existo 
con estado 202. En caso de error, devuelve una respuesta con estado 500. 
*/
  async update(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const artistRepository = AppDataSource.getRepository(Artists);
      const userRepository = AppDataSource.getRepository(User);
      const userId = req.tokenData.userId;

      const user = await userRepository.findOne({
        where: { id: +userId },
        relations: ["artist"],
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (!user.artist) {
        throw new Error("User is not an artist");
      }
      const data = req.body;
      const { portfolio } = req.body;
      await artistRepository.update(user.artist.id, { portfolio });

      res.status(202).json({
        message: "Artist portfolio updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while updating artist portfolio",
      });
    }
  }
/*
-Este metodo elimina un artista de DB.
-Obtiene el ID de artista atraves de los paramentros de solicitud, elimina el artista 
correspondiente a ID de DB y devuelve una respuesta con estado 20o enc aso de exito y 500 encaso 
de error.
*/
  async delete(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const artistRepository = AppDataSource.getRepository(Artists);
      await artistRepository.delete(id);

      res.status(200).json({
        message: "Artist deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while deleting Artist",
      });
    }
  }
/*
-El metodo getByArtistId obtiene los detalles de un artista especifico y del usuario asociado.
-Similar a la función getById, pero se enfoca en devolver tanto la información del artista como 
la de su usuario asociado en un formato estructurado. 
*/
  async getByArtistId(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const artistRepository = AppDataSource.getRepository(Artists);
      const artist = await artistRepository.findOne({
        where: { id: id },
        relations: ['user'],
      });

      if (!artist) {
        return res.status(404).json({
          message: "Artist not found",
        });
      }
      const response = {
        id: artist.id,
        portfolio: artist.portfolio,
        user: {
          name: artist.user.name,
          surname: artist.user.surname,
          email: artist.user.email,
          
        },
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error while getting artist:", error);
      res.status(500).json({
        message: "Error while getting artist",
      });
    }
  }
}