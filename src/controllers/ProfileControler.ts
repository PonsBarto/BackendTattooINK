import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Appointment } from "../models/Appointment";
import { User } from "../models/User";
import { Artists } from "../models/Artist";
import { In } from "typeorm";

export const ProfileController = {
  async userProfile(req: Request, res: Response): Promise<Response<any>> {
    try {
      const email = req.tokenData.email;
      const userId = Number(req.tokenData.userId);
      const userRepository = AppDataSource.getRepository(User);
      const appointmentsRepository = AppDataSource.getRepository(Appointment);
      const artistRepository = AppDataSource.getRepository(Artists);

      const profileUser = await userRepository.findOneBy({
        id: userId,
      });

      if (!profileUser) {
        return res.status(404).json({ message: "Profile not found" });
      } else {
        const { id } = profileUser;
        const appointments = await appointmentsRepository.findBy({
          user_id: id,
        });

        const artistIds = appointments.map(
          (appointment) => appointment.artist_id
        );
        if (artistIds.length === 0) {
          return res
            .status(200)
            .json({ profileUser, appointments, userArtistIds: [] });
        }

        const userArtistIds = await artistRepository
          .createQueryBuilder("artists")
          .innerJoinAndSelect("artists.user", "user")
          .where("artists.id IN (:...artistIds)", { artistIds })
          .getMany()
          .then((artistProfiles) =>
            artistProfiles.map((artistProfile) => artistProfile.user.name)
          );

        return res
          .status(200)
          .json({ profileUser, appointments, userArtistIds });
      }
    } catch (err) {
      console.error("Error in the profile controller", err);
      return res
        .status(401)
        .json({ status: "Error", message: "Not authorized." });
    }
  },

  async artistProfile(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const email = req.tokenData.email;
      const userId = Number(req.tokenData.userId);
      const userRepository = AppDataSource.getRepository(User);
      const userArtist = await userRepository.findOneBy({
        id: userId,
      });

      if (!userArtist) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const artistRepository = AppDataSource.getRepository(Artists);
      const artist = await artistRepository.findBy({
        user_id: userArtist.id,
      });

      if (!artist) {
        return res.status(404).json({
          message: "Artist not found",
        });
      }

      const artistProfile: any = {
        id: artist[0].id,
        userId: artist[0].user_id,
        portfolio: artist[0].portfolio,
        username: userArtist.username,
        name: userArtist.name,
        surname: userArtist.surname,
        photo: userArtist.photo,
        email: userArtist.email,
        appointments: [],
      };

      const appointments = await AppDataSource.getRepository(
        Appointment
      ).findBy({
        artist_id: artistProfile.id,
      });

      for (const appointment of appointments) {
        const user = await userRepository.findOneBy({
          id: appointment.user_id,
        });
        artistProfile.appointments.push({
          id: appointment.id,
          user: user?.name,
          userPhoto: user?.photo,
          userEmail: user?.email,
          date: appointment.date,
          hour: appointment.hour,
        });
      }

      return res.status(200).json({ artistProfile });
    } catch (error) {
      res.status(500).json({
        message: "Error while getting artist",
      });
    }
  },
};
