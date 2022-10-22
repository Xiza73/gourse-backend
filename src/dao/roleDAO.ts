import ErrorHandler from "../helpers/ErrorHandler";
import ResponseBase from "../helpers/ResponseBase";
import Role, { IRole } from "../models/Role";
import ResponseData from "../helpers/ResponseData";

export class RoleDAO {
  constructor() {}

  public addRole = async (description: string) => {
    try {
      const role: IRole = new Role({ description });
      await role.save();
      return new ResponseBase(200, "Rol creado correctamente");
    } catch (err) {
      return new ErrorHandler(404, "Error al crear rol");
    }
  };

  public getRole = async (id: string) => {
    try {
      const data = await Role.findById(id);
      return new ResponseData(200, "Rol obtenido correctamente", data);
    } catch (err) {
      return new ErrorHandler(404, "Error al obtener rol");
    }
  };

  public readRoles = async () => {
    try {
      const data = await Role.find();
      return new ResponseData(200, "Roles obtenidos correctamente", data);
    } catch (err) {
      return new ErrorHandler(404, "Error al obtener roles");
    }
  };

  public updateRole = async (body: any) => {
    const { id, description } = body;
    try {
      if (!description)
        return new ErrorHandler(400, "No se registró nombre del rol");
      await Role.findByIdAndUpdate(id, { description });
      return new ResponseBase(200, "Rol actualizado correctamente");
    } catch (err) {
      return new ErrorHandler(404, "Error al actualizar rol");
    }
  };

  public deleteRole = async (body: any) => {
    const { id } = body;
    try {
      await Role.findByIdAndDelete(id);
      return new ResponseBase(200, "Rol eliminado correctamente");
    } catch (err) {
      return new ErrorHandler(404, "Error al eliminar rol");
    }
  };
}
