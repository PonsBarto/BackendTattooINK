//-Controlador de Express para manejar las solicitudes relacionadas con las citas
/*
-Se importan varios módulos y clases necesarios para el funcionamiento del controlador, 
como Request y Response de Express, el modelo Appointment, el repositorio de datos AppDataSource, 
algunos tipos de datos, bcrypt para el cifrado de contraseñas, y otros modelos y constantes 
relacionadas con usuarios y roles.
*/
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

/*
-Se define una clase AppointmentController que implementa la interfaz Controller. 
Esto asegura que la clase tenga ciertos métodos definidos
*/
export class AppointmentController implements Controller {
/* 
-El metodo getAll maneja la solicitud para obtener todas las citas.
-Utiliza el perositorio de datos para encontrar y contar todas las citas, 
aplicando paginacion si es necesario.
-Responde con un objeto JASON que incluye la lista de citas y la informacion de paginacion.
*/
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
/*
-Este metodo getById maneja la solicitud para obtener una cita por su ID.
-Utiliza el repositorio de datos para buscar la cita por ID y la devuelve si se encuentra.
-Si no se encuentra la cita, responde con un mensaje error.
*/
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
  /*
  -El metodo getByArtistId, es similar a getById, pero busca citas por el ID de artistas.
  */
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

  /*
  -El metodo getByUserId, es similar a getById, pero busca citas por el ID de usuarios.
  */
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

/*
-Este metodo async create, maneja la solicitud para crear una nueva cita.
-Extrae los datos de la solicitud, como el ID del usuario y del artista, la fecha y la hora.
-Guarda la nueva cita en el repositorio de datos y responde con la cita creada.
*/
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

/*
-Este método async update maneja la solicitud para actualizar una cita ya existente.
-Extrae el ID de la cita y los nuevos datos de la solicitud.
-Actualiza la cita en el repositorio de datos y responde con un mensaje de éxito
o de error segun corresponda.
*/
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

 /*
-Este método maneja la solicitud para eliminar una cita por su ID.
-Extrae el ID de la cita de la solicitud y la elimina del repositorio de datos.
-Responde con un mensaje de éxito o error según corresponda.
 */
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