import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { AppDataSource } from "../database/data-source";
import { Controller } from "./Controller";
import {
  CreateAppointmentsRequestBody,
  CreateUserRequestBody,
} from "../types/types";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import { User } from "../models/User";

export class AppointmentController implements Controller {
  async getAll(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const appointmentRepository = AppDataSource.getRepository(Appointment);

      let { page, skip } = req.query;

      let currentPage = page ? +page : 1;
      let itemsPerPage = skip ? +skip : 10;

      const [allAppointments, count] = await appointmentRepository.findAndCount(
        {
          skip: (currentPage - 1) * itemsPerPage,
          take: itemsPerPage,
          select: {
            id: true,
            user_id: true,
            artist_id: true,
            date: true,
            hour: true,
          },
        }
      );
      res.status(200).json({
        count,
        skip: itemsPerPage,
        page: currentPage,
        results: allAppointments,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointments",
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointments = await appointmentRepository.findOneBy({
        id: id,
      });

      if (!appointments) {
        return res.status(404).json({
          message: "Appointment not found",
        });
      }

      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointments",
      });
    }
  }
  async getByArtistId(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointments = await appointmentRepository.findBy({
        artist_id: id,
      });

      if (!appointments) {
        return res.status(404).json({
          message: "Appointment not found",
        });
      }

      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointments",
      });
    }
  }

  async getByUserId(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointments = await appointmentRepository.findBy({
        user_id: id,
      });

      if (!appointments) {
        return res.status(404).json({
          message: "Appointment not found",
        });
      }

      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointments",
      });
    }
  }

  async create(
    req: Request<{}, {}, CreateAppointmentsRequestBody>,

    res: Response
 ): Promise<void | Response<any>> {
    const { user_id, artist_id, date, hour } = req.body;

    const appointmentRepository = AppDataSource.getRepository(Appointment);
    try {
       const newAppointment: Appointment = {
          user_id,
          artist_id,
          date,
          hour,
          
       }
        await appointmentRepository.save(newAppointment);
       res.status(201).json(newAppointment);
    } catch (error: any) {
       console.error("Error while creating Appointment:", error);
       res.status(500).json({
          message: "Error while creating Appointment",
          error: error.message,
       });
    }
 }
 async update(req: Request, res: Response): Promise<void | Response<any>> {
    try {
       const id = +req.params.id;
       const data = req.body;

       const appointmentRepository = AppDataSource.getRepository(Appointment);
       const appointmentUpdated = await appointmentRepository.update({ id: id }, data);
       res.status(202).json({
          message: "Appointment updated successfully",
       });
    } catch (error) {
       res.status(500).json({
          message: "Error while updating appointment",
       });
    }
 }
 async delete(req: Request, res: Response): Promise<void | Response<any>> {
    try {
       const id = +req.params.id;

       const appointmentRepository = AppDataSource.getRepository(Appointment);
       await appointmentRepository.delete(id);

       res.status(200).json({
          message: "Appointment deleted successfully",
       });
    } catch (error) {
       res.status(500).json({
          message: "Error while deleting appointment",
       });
    }
 }
}