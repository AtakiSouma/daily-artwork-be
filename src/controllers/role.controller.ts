import { NextFunction, Request, Response } from "express";
import CustomError, { generateError } from "../libs/handlers/errorsHandlers";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import roleServices from "../services/role.services";
import {
  sendSuccessResponse,
  sendSuccessResponseBoolean,
  sendSuccessResponseWithStatusCode,
} from "../constants/successResponse";

const roleController = {
  createRoles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description } = req.body;
      if (!title || !description) {
        throw generateError("Input is invalid", HttpStatusCodes.BAD_REQUEST);
      }
      const roleCreate = await roleServices.createNewRoles({
        title,
        description,
      });
      return sendSuccessResponse(res, HttpStatusCodes.OK, roleCreate);
    } catch (error) {
      if (error instanceof CustomError) {
        next(error);
      } else if (error instanceof Error) {
        next(error.message);
      } else {
        next(error);
      }
    }
  },

  updateRoles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      if (!slug) {
        throw generateError("Orchid not found", HttpStatusCodes.NOT_FOUND);
      }
      const { title, description } = req.body;
      const roleUpdate = await roleServices.updateRoles({
        slug,
        title,
        description,
      });
      return sendSuccessResponse(res, HttpStatusCodes.OK, roleUpdate);
    } catch (error) {
      if (error instanceof CustomError) {
        next(error);
      } else if (error instanceof Error) {
        next(error.message);
      } else {
        next(error);
      }
    }
  },

  getOneRoles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      if (!slug) {
        throw generateError("Role not found", HttpStatusCodes.NOT_FOUND);
      }
      const oneRole = await roleServices.getOneRoles({ slug });
      return sendSuccessResponse(res, HttpStatusCodes.OK, oneRole);
    } catch (error) {
      if (error instanceof CustomError) {
        next(error);
      } else if (error instanceof Error) {
        next(error.message);
      } else {
        next(error);
      }
    }
  },

  getAllRoles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search, limit, page } = req.body;
      const AllRole = await roleServices.getAllRoles({ search, page, limit });
      return sendSuccessResponse(res, HttpStatusCodes.OK, AllRole);
    } catch (error) {
      if (error instanceof CustomError) {
        next(error);
      } else if (error instanceof Error) {
        next(error.message);
      } else {
        next(error);
      }
    }
  },
  deleteRoles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      const DeletedRole = await roleServices.DeleteOneRoles({ slug });
      if (DeletedRole)
        return sendSuccessResponseWithStatusCode(res, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof CustomError) {
        next(error);
      } else if (error instanceof Error) {
        next(error.message);
      } else {
        next(error);
      }
    }
  },
};

export default roleController;
