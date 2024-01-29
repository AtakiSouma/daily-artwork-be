import HttpStatusCodes from "../constants/HttpStatusCodes";
import {
  IPaginationParams,
  IParams,
  IRoles,
  IRolesParams,
  IRolesUpdate,
} from "../constants/data";
import { generateError } from "../libs/handlers/errorsHandlers";
import { Roles } from "../models/Roles";
import GenerateSlug from "../util/GenerateSlug";

class rolesServices {
  // create a new Role
  public async createNewRoles({ title, description }: IRolesParams) {
    // check exist roles
    const existRoles = await Roles.findOne({
      title: title,
    });
    if (existRoles) {
      throw generateError(
        `${title} already exists !`,
        HttpStatusCodes.CONFLICT
      );
    }
    const newRoles = await Roles.create({
      title: title,
      slug: GenerateSlug(title),
      description: description,
    });
    return newRoles;
  }

  public async updateRoles({ title, description, slug }: IRolesUpdate) {
    const existRoles = await Roles.findOne({
      slug: slug,
    });
    if (existRoles) {
      existRoles.title = title || existRoles.title;
      existRoles.description = description || existRoles.description;
    } else {
      throw generateError(
        `Roles : ${slug} not found!`,
        HttpStatusCodes.NOT_FOUND
      );
    }
    const updatedRoles = await existRoles?.save();
    return updatedRoles;
  }
  public async getOneRoles({ slug }: IParams) {
    const existRoles = await Roles.findOne({
      slug: slug,
    });
    if (!existRoles) {
      throw generateError(`Category not found!`, HttpStatusCodes.NOT_FOUND);
    }
    return existRoles;
  }

  public async DeleteOneRoles({ slug }: IParams) {
    const existRole = await Roles.findOne({
      slug: slug,
    });
    if (!existRole) {
      throw generateError(`Category not found!`, HttpStatusCodes.NOT_FOUND);
    }
    await existRole.deleteOne();
    return true;
  }

  public async getAllRoles({ search, page, limit }: IPaginationParams) {
    try {
      const query = {
        status: true,
        title: { $regex: new RegExp(search, "i")},
      };
      const RoleList = await Roles.find(query)
        .sort({ create_at: "desc" })
        .skip((page - 1) * limit)
        .limit(limit);

      const totalCount = await Roles.countDocuments(query);
      const data = RoleList.map((role) => ({
        id: role.id,
        title: role.title,
        slug: role.slug,
        description: role.description,
        status: role.status,
      }));
      const response = {
        data,
        totalCount,
        pageCount: Math.ceil(totalCount / limit),
      };
      return response;
    } catch (error) {
      console.log(error);
      throw generateError("Cannot get role!", HttpStatusCodes.BAD_REQUEST);
    }
  }
}

export default new rolesServices();
