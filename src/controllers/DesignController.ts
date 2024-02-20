import { Request, Response } from "express";
import { Controller } from "./Controller";
import { AppDataSource } from "../database/data-source";
import { Design } from "../models/Design";


export class DesignController implements Controller {
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

    async getByArtistId(req: Request, res: Response): Promise<void | Response<any>> {
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

     async create(req: Request<{}, {}>, res: Response ): Promise<void | Response<any>> {
        const { artist_id, style, picture } = req.body;

        const designRepository = AppDataSource.getRepository(Design);
        try {
           const newDesign: Design = {
            artist_id,
            style,
            picture,

           }
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