import ErrorHandler from "../helpers/ErrorHandler";
import ResponseBase from "../helpers/ResponseBase";
import ResponseData from "../helpers/ResponseData";
import User, { encryptPassword } from "../models/User";
import Client from "../models/Client";

export class UserDAO {
  constructor() {}

  public getUsers = async (person: string) => {
    try {
      let data;
      if (person) {
        data = await User.find({ onPerson: person })
          .populate({
            path: "person",
          })
          .populate("role");
      } else {
        data = await User.find()
          .populate({
            path: "person",
          })
          .populate("role");
      }
      return new ResponseData(200, "Usuarios obtenidos correctamente", data);
    } catch (error) {
      console.log(error);
      return new ErrorHandler(404, "Error al obtener datos de usuario");
    }
  };

  public getUsersByRole = async (body: any) => {
    try {
      const { role } = body;
      if (!role) return new ErrorHandler(400, "Error al leer la data");
      const data = await User.find({ role })
        .populate({
          path: "person",
        })
        .populate("role");
      if (!data || data.length === 0)
        return new ErrorHandler(400, "No existen registros");
      return new ResponseData(200, "Usuarios obtenidos correctamente", data);
    } catch (error) {
      console.log(error);
      return new ErrorHandler(404, "Error al obtener datos de usuarios");
    }
  };

  public getUser = async (body: any) => {
    try {
      const { id } = body;
      if (!id) return new ErrorHandler(400, "Error al leer la data");
      const data = await User.findById(id)
        .populate({
          path: "person",
        })
        .populate("role");
      if (!data) return new ErrorHandler(400, "No existe el usuario");
      return new ResponseData(200, "Usuarios obtenidos correctamente", data);
    } catch (error) {
      console.log(error);
      return new ErrorHandler(404, "Error al obtener datos de usuario");
    }
  };

  public updateUser = async (body: any) => {
    try {
      const { id, username, role, name, description } = body;
      if (!id) return new ErrorHandler(400, "Error al leer la data");
      const user = await User.findByIdAndUpdate(id, {
        username,
        role,
      });
      await Client.findByIdAndUpdate(user?.person._id, {
        name,
        description,
      });
      return new ResponseBase(200, "Usuario actualizado correctamente");
    } catch (error) {
      console.log(error);
      return new ErrorHandler(404, "Error al actualizar datos de usuario");
    }
  };

  public updatePremium = async (body: any) => {
    try {
      const { id } = body;
      if (!id) return new ErrorHandler(400, "Error al leer la data");
      const user = await User.findByIdAndUpdate(id, {
        isPremium: true,
      });
      return new ResponseBase(200, "Usuario actualizado correctamente");
    } catch (error) {
      console.log(error);
      return new ErrorHandler(404, "Error al actualizar datos de usuario");
    }
  };

  public deleteUser = async (id: string) => {
    try {
      if (!id) return new ErrorHandler(400, "Error al leer la data");
      await User.findByIdAndUpdate(id, { status: 0 });
      return new ResponseBase(200, "Usuario eliminado correctamente");
    } catch (error) {
      console.log(error);
      return new ErrorHandler(404, "Error al elimnar usuario");
    }
  };

  public updatePassword = async (body: any) => {
    try {
      const { id, password, newPassword } = body;

      const user = await User.findById(id);
      if (!user) return new ErrorHandler(404, "Error obtener datos de usuario");

      const match = await user.comparePassword(password);
      if (!match)
        return new ErrorHandler(400, "La contraseña ingresada no coincide");

      const pwd = await encryptPassword(newPassword);
      await User.findByIdAndUpdate(id, { password: pwd });

      return new ResponseBase(200, "Contraseña actualizada correctamente");
    } catch (error) {
      console.log(error);
      return new ErrorHandler(404, "Error al actualizar contraseña");
    }
  };
}
