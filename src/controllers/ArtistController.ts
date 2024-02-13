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
import { Relation } from "typeorm";

export class ArtistController implements Controller {
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

  async create(
    req: Request<{}, {}, CreateUserRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const { username, name, surname, password_hash, email } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    try {
      const newUser: User = {
        username,
        name,
        surname,
        email,
        password_hash: bcrypt.hashSync(password_hash, 10),
        roles: [UserRoles.ADMIN],
      };
      await userRepository.save(newUser);

      if (newUser.roles.includes(UserRoles.ADMIN)) {
        const artistRepository = AppDataSource.getRepository(Artists);
        const newArtist = artistRepository.create({
          user_id: newUser.id,
          portfolio: "https://",
        });

        await artistRepository.save(newArtist);
      }

      res.status(201).json("Artist create successfully");
    } catch (error: any) {
      res.status(500).json({
        message: "Error while creating artis",
        error: error.message,
      });
    }
  }

  async update(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const data = req.body;

      const artistRepository = AppDataSource.getRepository(Artists);
      const artistUpdated = await artistRepository.update({ id: id }, data);
      res.status(202).json({
        message: "Artist updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while updating artist",
      });
    }
  }

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

  async getByArtistId(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const artistRepository = AppDataSource.getRepository(Artists);
      const artist = await artistRepository.findOneBy({
        id: id,
      });

      const userRepository = AppDataSource.getRepository(User);
      let userArtist = await userRepository.findBy({
        artist: true,
        id: artist?.user_id,
      });

      if (!userArtist) {
        return res.status(404).json({
          message: "Artist not found",
        });
      }
      const response = {
        ...artist,
        ...userArtist,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting artist",
      });
    }
  }
}
