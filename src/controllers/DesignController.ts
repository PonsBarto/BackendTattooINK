/* */

import { Request, Response } from "express";
import { Controller } from "./Controller";
import { AppDataSource } from "../database/data-source";
import { Design } from "../models/Design";

export class DesignController implements Controller {
  /*
   -GetAll Recuperar y devolver una lista paginada de todos los diseños disponibles en la base de 
   datos. 

   -Utiliza los parámetros de consulta page y skip para determinar la página actual y la cantidad 
   de items por página, respectivamente. Luego, realiza una consulta a la base de datos para 
   obtener los diseños y el conteo total, aplicando la paginación según los parámetros 
   proporcionados. Finalmente, devuelve esta información al cliente en formato JSON.
   */
  async getAll(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const desingRepository = AppDataSource.getRepository(Design);

      let { page, skip } = req.query;

      let currentPage = page ? +page : 1;
      let itemsPerPage = skip ? +skip : 10;

      const [allDesign, count] = await desingRepository.findAndCount({
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
        select: {
          id: true,
          artist_id: true,
          style: true,
          picture: true,
        },
      });
      res.status(200).json({
        count,
        skip: itemsPerPage,
        page: currentPage,
        results: allDesign,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while getting designs",
      });
    }
  }

  /*
  -getById buscar y devolver un diseño específico por su ID.

  -Extrae el ID del diseño de los parámetros de la ruta y realiza una búsqueda en la base de datos 
  para encontrar el diseño correspondiente. Si el diseño se encuentra, lo devuelve al cliente; 
  de lo contrario, devuelve un mensaje indicando que el diseño no se encontró.
  */
  async getById(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const designRepository = AppDataSource.getRepository(Design);
      const designs = await designRepository.findOneBy({
        id: id,
      });

      if (!designs) {
        return res.status(404).json({
          message: "Designs not found",
        });
      }

      res.status(200).json(designs);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting designs",
      });
    }
  }

  /*
  -getByArtistId Recupera y devulve todos los diseños asociados a un artista específico, 
  identificado por su ID.

  -Toma el ID del artista de los parámetros de la ruta y DB todos los diseños que pertenecen a ese
  artista. Devuelve estos diseños al cliente o un mensaje de error 
  si no se encuentran diseños.
  */
  async getByArtistId(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const designRepository = AppDataSource.getRepository(Design);
      const designs = await designRepository.findBy({
        artist_id: id,
      });

      if (!designs) {
        return res.status(404).json({
          message: "Appointment not found",
        });
      }

      res.status(200).json(designs);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointments",
      });
    }
  }

  /*
  -create crea un nuevo diseño en DB.
  -Recoge los datos del diseño (como artist_id, style, picture) del cuerpo de la solicitud y crea 
  un nuevo registro de diseño en la base de datos. Si la creación es exitosa, devuelve el nuevo 
  diseño al cliente.
  */
  async create(
    req: Request<{}, {}>,
    res: Response
  ): Promise<void | Response<any>> {
    const { artist_id, style, picture } = req.body;

    const designRepository = AppDataSource.getRepository(Design);
    try {
      const newDesign: Design = {
        artist_id,
        style,
        picture,
      };
      await designRepository.save(newDesign);
      res.status(201).json(newDesign);
    } catch (error: any) {
      console.error("Error while creating Design:", error);
      res.status(500).json({
        message: "Error while creating Design",
        error: error.message,
      });
    }
  }

  /*
  -update actualizar los detalles de un diseño existente. 
  */
  async update(req: Request, res: Response): Promise<void | Response<any>> {
    try {
    } catch (error) {
      res.status(500).json({
        message: "Error while updating appointment",
      });
    }
  }
  async delete(req: Request, res: Response): Promise<void | Response<any>> {
    try {
    } catch (error) {
      res.status(500).json({
        message: "Error while deleting appointment",
      });
    }
  }
}
