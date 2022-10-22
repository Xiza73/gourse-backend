import ErrorHandler from "../helpers/ErrorHandler";
import ResponseBase from "../helpers/ResponseBase";
import ResponseData from "../helpers/ResponseData";
import User, { IUser } from "../models/User";
import Client, { IClient } from "../models/Client";
import Course from "../models/Course";

export class ClientDAO {
  constructor() {}

  public getUserProfile = async (username: string) => {
    try {
      const user: (IUser & { _id: any }) | null = await User.findOne({
        username,
      });
      if (!user)
        return new ErrorHandler(400, "Datos de usuario no encontrados");
      const client: (IClient & { _id: any }) | null = await Client.findById(
        user.person._id
      );
      if (!client)
        return new ErrorHandler(400, "Datos de usuario no encontrados");

      return new ResponseData(200, "Datos de usuario obtenidos correctamente", {
        id: user._id,
        username: user.username,
        email: client.email,
        aboutMe: client.aboutMe,
      });
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener datos de usuario");
    }
  };

  public updateUserProfile = async (id: string, body: any) => {
    const { username, aboutMe } = body;
    try {
      if ((!username || !aboutMe) && aboutMe !== "")
        return new ErrorHandler(400, "Error al obtener los datos");

      const userToUpdate: (IUser & { _id: any }) | null = await User.findById(
        id
      );

      if (!userToUpdate) {
        return new ErrorHandler(400, "Datos de usuario no encontrados");
      }

      const clientToUpdate: (IClient & { _id: any }) | null =
        await Client.findOne({
          _id: userToUpdate.person._id,
        });

      if (!clientToUpdate) {
        return new ErrorHandler(400, "Datos de cliente no encontrados");
      }

      const user = await User.findOne({
        username,
      });

      if (user && user.username !== userToUpdate.username) {
        return new ErrorHandler(422, "El nombre de usuario ya está registrado");
      }

      await User.findOneAndUpdate({ _id: id }, { username });
      await Client.findOneAndUpdate(
        { _id: userToUpdate.person._id },
        { aboutMe }
      );

      return new ResponseBase(200, "Datos actualizados correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al actualizar los datos");
    }
  };

  public getUserProfileId = async (id: string) => {
    try {
      const user: (IUser & { _id: any }) | null = await User.findById(id);
      if (!user)
        return new ErrorHandler(400, "Datos de usuario no encontrados");
      const client: (IClient & { _id: any }) | null = await Client.findOne({
        _id: user.person._id,
      });
      if (!client)
        return new ErrorHandler(400, "Datos de cliente no encontrados");

      return new ResponseData(200, "Datos de usuario obtenidos correctamente", {
        username: user.username,
        email: client.email,
        aboutMe: client.aboutMe,
        isPremium: user.isPremium,
      });
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener datos de usuario");
    }
  };

  public updateUserProfileId = async (body: any) => {
    const { username, aboutMe, id } = body;
    try {
      if (!username || !id)
        return new ErrorHandler(400, "Error al obtener los datos");

      let user: (IUser & { _id: any }) | null = await User.findOne({
        username,
      });
      if (user) {
        return new ErrorHandler(422, "El nombre de usuario ya está registrado");
      }

      user = await User.findById(id);
      if (!user)
        return new ErrorHandler(400, "Datos de usuario no encontrados");
      await User.findOneAndUpdate({ _id: id }, { username });
      await Client.findOneAndUpdate({ _id: user.person._id }, { aboutMe });

      return new ResponseBase(200, "Datos actualizados correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al actualizar los datos");
    }
  };

  public readClient = async (id: string) => {
    try {
      const data = await Client.findById(id);
      return new ResponseData(200, "Cliente obtenido correctamente", data);
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener cliente");
    }
  };

  public readClients = async () => {
    try {
      const data = await Client.find({ status: 1 });
      return new ResponseData(200, "Cliente obtenido correctamente", data);
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener cliente");
    }
  };

  public addFavorite = async (body: any) => {
    const { courseUrl, clientId } = body;
    try {
      const client: (IClient & { _id: string }) | null = await Client.findById(
        clientId
      );

      if (!client) {
        return new ErrorHandler(422, "El cliente no está registrado");
      }

      await Client.updateOne(
        { _id: clientId },
        {
          $push: {
            favorites: courseUrl,
          },
        }
      );

      return new ResponseBase(200, "Curso agregado a favoritos correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al agregar curso a favoritos");
    }
  };

  public removeFavorite = async (body: any) => {
    const { courseUrl, clientId } = body;
    try {
      const client: (IClient & { _id: string }) | null = await Client.findById(
        clientId
      );

      if (!client) {
        return new ErrorHandler(422, "El cliente no está registrado");
      }

      await Client.updateOne(
        { _id: clientId },
        {
          $pull: {
            favorites: courseUrl,
          },
        }
      );

      return new ResponseBase(200, "Curso removido de favoritos correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al remover curso de favoritos");
    }
  };

  public readFavorites = async (id: string) => {
    try {
      const client = await Client.findById(id);

      if (!client) {
        return new ErrorHandler(422, "El cliente no está registrado");
      }

      const data = await Course.find({
        url: { $in: client.favorites },
        status: 1,
      });

      return new ResponseData(
        200,
        "Cursos favoritos obtenidos correctamente",
        data
      );
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener cursos favoritos");
    }
  };
}
