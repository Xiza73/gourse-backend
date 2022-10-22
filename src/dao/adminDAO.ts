import ErrorHandler from "../helpers/ErrorHandler";
import ResponseData from "../helpers/ResponseData";
import User, { IUser, encryptPassword } from "../models/User";
import Admin, { IAdmin } from "../models/Admin";
import ResponseBase from "../helpers/ResponseBase";
import Role, { IRole } from "../models/Role";

export class AdminDAO {
  constructor() {}

  public getUserProfileId = async (id: string) => {
    try {
      const user: (IUser & { _id: any }) | null = await User.findById(id);
      if (!user)
        return new ErrorHandler(400, "Datos de usuario no encontrados");
      const admin: (IAdmin & { _id: any }) | null = await Admin.findOne({
        _id: user.person._id,
      });
      if (!admin)
        return new ErrorHandler(400, "Datos de administrador no encontrados");

      return new ResponseData(200, "Datos de usuario obtenidos correctamente", {
        username: user.username,
        email: admin.email,
      });
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener datos de usuario");
    }
  };

  public createUser = async (request: any) => {
    //register for admins
    const { username, roleId, password, name, email, description, status } =
      request;
    try {
      if (
        !username ||
        !email ||
        !password ||
        !roleId ||
        !name ||
        (!status && status !== 0)
      )
        return new ErrorHandler(400, "Faltan datos");

      const user: (IUser & { _id: any }) | null = await User.findOne({
        username,
      });
      if (user) {
        return new ErrorHandler(422, "El nombre de usuario ya está registrado");
      }

      const role: (IRole & { _id: any }) | null = await Role.findById(
        roleId
      ).exec();

      if (!role) return new ErrorHandler(400, "No se encontró el rol");

      let newAdmin: (IAdmin & { _id: any }) | null = await Admin.findOne(
        { email },
        { _id: 1 }
      ).exec();

      if (newAdmin) {
        let use: (IUser & { _id: any }) | null = await User.findOne({
          person: newAdmin._id,
        });
        if (use) return new ErrorHandler(422, "El usuario ya está registrado");
      } else {
        newAdmin = new Admin({ name, email, description });
        await newAdmin.save();
      }

      const newUser = new User({
        username,
        password,
        person: newAdmin._id,
        role: role._id,
        onPerson: "Admin",
        status,
      });
      await newUser.save();

      return new ResponseBase(200, "Usuario registrado correctamente");
    } catch (err) {
      return new ErrorHandler(400, "Error al registrar usuario");
    }
  };

  public updateUser = async (request: any) => {
    const {
      id,
      username,
      roleId,
      newPassword,
      name,
      email,
      description,
      status,
    } = request;
    try {
      if (!username || !email || !roleId || !name || (!status && status !== 0))
        return new ErrorHandler(400, "Faltan datos");

      const user: (IUser & { _id: any }) | null = await User.findById(id);
      if (!user) return new ErrorHandler(422, "No se encontró el usuario");

      const role: (IRole & { _id: any }) | null = await Role.findById(roleId);
      if (!role) return new ErrorHandler(400, "No se encontró el rol");

      const admin: (IAdmin & { _id: any }) | null = await Admin.findById(
        user.person._id
      );
      if (!admin)
        return new ErrorHandler(400, "No se encontró datos del usuario");

      const userDb: (IUser & { _id: any }) | null = await User.findOne({
        username,
      });

      if (userDb && userDb.username !== user.username)
        return new ErrorHandler(422, "El nombre de usuario ya está en uso");

      const adminDb: (IAdmin & { _id: any }) | null = await Admin.findOne({
        email,
      });
      if (adminDb && adminDb.email !== admin.email)
        return new ErrorHandler(422, "El correo electrónico ya está en uso");

      await Admin.findByIdAndUpdate(user.person._id, {
        email,
        name,
        description,
      });

      if (newPassword) {
        const password = await encryptPassword(newPassword);
        await User.findByIdAndUpdate(id, { username, password, role, status });
      } else {
        await User.findByIdAndUpdate(id, { username, role, status });
      }

      return new ResponseBase(200, "Usuario actualizado correctamente");
    } catch (err) {
      return new ErrorHandler(400, "Error al actualizar usuario");
    }
  };

  public deleteUser = async (id: string) => {
    try {
      if (!id) return new ErrorHandler(400, "Error al leer la data");
      const user: (IUser & { _id: any }) | null = await User.findById(id);
      if (!user)
        return new ErrorHandler(400, "Datos de usuario no encontrados");
      await Admin.deleteOne({ _id: user.person._id });
      await User.deleteOne({ _id: user._id });
      return new ResponseBase(200, "Usuario eliminado correctamente");
    } catch (error) {
      console.log(error);
      return new ErrorHandler(404, "Error al elimnar usuario");
    }
  };
}
