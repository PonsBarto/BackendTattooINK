import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Appointment } from "../models/Appointment";
import { User } from "../models/User";
import { Artists } from "../models/Artist";
import { In } from 'typeorm';



export const ProfileController = {
  async userProfile(req: Request, res: Response): Promise<Response<any>> {
    try {
      const email = req.tokenData.email
      const userRepository = AppDataSource.getRepository(User);
      const appointmentsRepository = AppDataSource.getRepository(Appointment);
      const artistRepository = AppDataSource.getRepository(Artists);

      const profileUser = await userRepository.findOneBy({
        email,
      });

      if (!profileUser) {
        return res.status(404).json({ message: 'Profile not found' });
      } else {
        const { id } = profileUser;
        const appointments = await appointmentsRepository.findBy({
          user_id: id,
        });

        const artistIds = appointments.map((appointment) => appointment.artist_id);
        if (artistIds.length === 0) {
        
        }

        const userArtistIds = await artistRepository.createQueryBuilder('artists')
          .innerJoinAndSelect('artists.user', 'user')
          .where('artists.id In(:...artistIds)', { artistIds })
          .getMany()
          .then(artistProfiles => artistProfiles.map(artistProfile => artistProfile.user.name));

        return res.status(200).json({ profileUser, appointments, userArtistIds });
      }
    } catch (err) {
      console.error('Error in the profile controller', err);
      return res.status(401).json({ status: 'Error', message: 'Not authorized.' });
    }
  },
};